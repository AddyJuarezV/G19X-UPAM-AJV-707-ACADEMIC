from rest_framework import generics, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CollaboratorProfile
from .serializers import (
    ApplicationReviewSerializer,
    CollaboratorRegistrationSerializer,
    PendingApplicationSerializer,
    CollaboratorProfileSerializer,
)

class CollaboratorRegistrationView(generics.CreateAPIView):
    serializer_class = CollaboratorRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        profile = serializer.save()

        return Response(
            {
                "message": "Cuenta creada correctamente.",
                "user": {
                    "email": profile.user.email,
                    "role": profile.user.role,
                },
                "profile": {
                    "id": profile.id,
                    "full_name": profile.full_name,
                    "university_acronym": profile.university_acronym,
                    "application_status": profile.application_status,
                },
            },
            status=status.HTTP_201_CREATED,
        )

class SubmitApplicationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        if user.role != user.Role.COLABORADOR:
            return Response(
                {
                    "detail": "Solo los colaboradores pueden enviar una solicitud."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            profile = user.collaborator_profile
        except AttributeError:
            return Response(
                {
                    "detail": "El usuario no tiene un perfil de colaborador."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        allowed_statuses = [
            profile.ApplicationStatus.DRAFT,
            profile.ApplicationStatus.NEEDS_CORRECTION,
        ]

        if profile.application_status not in allowed_statuses:
            return Response(
                {
                    "detail": "La solicitud no puede enviarse en su estado actual.",
                    "application_status": profile.application_status,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        profile.application_status = profile.ApplicationStatus.IN_REVIEW
        profile.correction_reason = ""
        profile.save(
            update_fields=[
                "application_status",
                "correction_reason",
                "updated_at",
            ]
        )

        return Response(
            {
                "message": "Solicitud enviada correctamente.",
                "application_status": profile.application_status,
            },
            status=status.HTTP_200_OK,
        )

class PendingApplicationsView(generics.ListAPIView):
    serializer_class = PendingApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role != user.Role.ENCARGADO:
            raise PermissionDenied(
                "Solo los encargados pueden consultar las solicitudes pendientes."
            )

        return (
            CollaboratorProfile.objects
            .filter(
                application_status=CollaboratorProfile.ApplicationStatus.IN_REVIEW
            )
            .select_related("user")
            .order_by("updated_at")
        )

class ReviewApplicationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = request.user

        if user.role != user.Role.ENCARGADO:
            return Response(
                {
                    "detail":
                        "Solo los encargados pueden revisar solicitudes."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            profile = CollaboratorProfile.objects.select_related(
                "user"
            ).get(pk=pk)
        except CollaboratorProfile.DoesNotExist:
            return Response(
                {
                    "detail": "La solicitud no existe."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        if (
            profile.application_status
            != CollaboratorProfile.ApplicationStatus.IN_REVIEW
        ):
            return Response(
                {
                    "detail":
                        "Solo se pueden revisar solicitudes en estado IN_REVIEW.",
                    "application_status": profile.application_status,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ApplicationReviewSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)

        decision = serializer.validated_data["decision"]
        correction_reason = serializer.validated_data[
            "correction_reason"
        ]

        if (
            decision
            == ApplicationReviewSerializer.Decision.APPROVE
        ):
            profile.application_status = (
                CollaboratorProfile.ApplicationStatus.APPROVED
            )
            profile.correction_reason = ""

            message = "Solicitud aprobada correctamente."

        else:
            profile.application_status = (
                CollaboratorProfile.ApplicationStatus.NEEDS_CORRECTION
            )
            profile.correction_reason = correction_reason

            message = "Corrección solicitada correctamente."

        profile.save(
            update_fields=[
                "application_status",
                "correction_reason",
                "updated_at",
            ]
        )

        return Response(
            {
                "message": message,
                "profile_id": profile.id,
                "full_name": profile.full_name,
                "application_status": profile.application_status,
                "correction_reason": profile.correction_reason,
            },
            status=status.HTTP_200_OK,
        )

class MyCollaboratorProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get_profile(self, user):
        if user.role != user.Role.COLABORADOR:
            return None

        try:
            return user.collaborator_profile
        except AttributeError:
            return None

    def get(self, request):
        profile = self.get_profile(request.user)

        if profile is None:
            return Response(
                {
                    "detail":
                        "El usuario no tiene un perfil de colaborador."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = CollaboratorProfileSerializer(
            profile,
            context={"request": request},
        )

        return Response(serializer.data)

    def patch(self, request):
        profile = self.get_profile(request.user)

        if profile is None:
            return Response(
                {
                    "detail":
                        "El usuario no tiene un perfil de colaborador."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        editable_statuses = [
            CollaboratorProfile.ApplicationStatus.DRAFT,
            CollaboratorProfile.ApplicationStatus.NEEDS_CORRECTION,
        ]

        if profile.application_status not in editable_statuses:
            return Response(
                {
                    "detail":
                        "El perfil no puede modificarse en su estado actual.",
                    "application_status":
                        profile.application_status,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = CollaboratorProfileSerializer(
            profile,
            data=request.data,
            partial=True,
            context={"request": request},
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {
                "message": "Perfil actualizado correctamente.",
                "profile": serializer.data,
            },
            status=status.HTTP_200_OK,
        )