from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import FormParser, MultiPartParser

from accounts.models import CollaboratorProfile

from .models import (
    Generation,
    GenerationMembership,
    OnboardingDocument,
)
from .serializers import (
    GenerationCreateSerializer,
    GenerationMembershipCreateSerializer,
    GenerationSerializer,
    AvailableCollaboratorSerializer,
    OnboardingDocumentSerializer,
    CollaboratorDocumentUploadSerializer,
)


def validate_manager(user):
    if user.role != user.Role.ENCARGADO:
        raise PermissionDenied(
            "Solo los encargados pueden administrar generaciones."
        )


class GenerationListView(generics.ListAPIView):
    serializer_class = GenerationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        validate_manager(self.request.user)

        return (
            Generation.objects
            .prefetch_related(
                "members__collaborator"
            )
            .order_by("-number")
        )

class GenerationDetailView(generics.RetrieveAPIView):
    serializer_class = GenerationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        validate_manager(self.request.user)

        return (
            Generation.objects
            .prefetch_related(
                "members__collaborator"
            )
        )


class GenerationCreateView(generics.CreateAPIView):
    serializer_class = GenerationCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        validate_manager(self.request.user)

        serializer.save(
            status=Generation.Status.OPEN
        )


class AddGenerationMemberView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        validate_manager(request.user)

        generation = get_object_or_404(
            Generation,
            pk=pk,
        )

        if generation.status != Generation.Status.OPEN:
            return Response(
                {
                    "detail":
                        "No se pueden agregar colaboradores a una generación cerrada."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = GenerationMembershipCreateSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)

        collaborator = CollaboratorProfile.objects.get(
            pk=serializer.validated_data["collaborator_id"]
        )

        membership = GenerationMembership.objects.create(
            generation=generation,
            collaborator=collaborator,
        )

        return Response(
            {
                "message":
                    "Colaborador asignado correctamente.",
                "generation": generation.number,
                "collaborator": (
                    f"{collaborator.full_name} - "
                    f"{collaborator.university_acronym}"
                ),
                "membership_id": membership.id,
            },
            status=status.HTTP_201_CREATED,
        )


class CloseGenerationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        validate_manager(request.user)

        generation = get_object_or_404(
            Generation,
            pk=pk,
        )

        if generation.status == Generation.Status.CLOSED:
            return Response(
                {
                    "detail":
                        "La generación ya se encuentra cerrada."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        generation.close()

        return Response(
            {
                "message":
                    "Generación cerrada correctamente.",
                "generation": generation.number,
                "status": generation.status,
                "closed_at": generation.closed_at,
            },
            status=status.HTTP_200_OK,
        )

class AvailableCollaboratorsView(generics.ListAPIView):
    serializer_class = AvailableCollaboratorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        validate_manager(self.request.user)

        return (
            CollaboratorProfile.objects
            .filter(
                application_status=CollaboratorProfile.ApplicationStatus.APPROVED,
                generation_membership__isnull=True,
            )
            .select_related("user")
            .order_by("full_name")
        )

class MyOnboardingDocumentsView(generics.ListAPIView):
    serializer_class = OnboardingDocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role != self.request.user.Role.COLABORADOR:
            raise PermissionDenied(
                "Solo los colaboradores pueden consultar sus documentos."
            )

        collaborator = get_object_or_404(
            CollaboratorProfile,
            user=self.request.user,
        )

        return (
            OnboardingDocument.objects
            .filter(collaborator=collaborator)
            .order_by("document_type")
        )

class UploadMyOnboardingDocumentView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, pk):
        if request.user.role != request.user.Role.COLABORADOR:
            raise PermissionDenied(
                "Solo los colaboradores pueden subir sus documentos."
            )

        collaborator = get_object_or_404(
            CollaboratorProfile,
            user=request.user,
        )

        document = get_object_or_404(
            OnboardingDocument,
            pk=pk,
            collaborator=collaborator,
        )

        allowed_statuses = {
            OnboardingDocument.Status.PENDING,
            OnboardingDocument.Status.NEEDS_CORRECTION,
        }

        if document.status not in allowed_statuses:
            return Response(
                {
                    "detail": (
                        "Este documento no se encuentra disponible "
                        "para carga."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = CollaboratorDocumentUploadSerializer(
            document,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {
                "message": "Documento entregado correctamente.",
                "document": OnboardingDocumentSerializer(
                    document,
                    context={"request": request},
                ).data,
            },
            status=status.HTTP_200_OK,
        )