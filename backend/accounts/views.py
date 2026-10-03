from rest_framework import generics, status
from rest_framework.response import Response

from .serializers import CollaboratorRegistrationSerializer

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView


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