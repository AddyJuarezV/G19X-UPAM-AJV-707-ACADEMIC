from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import CollaboratorProfile

from .models import Generation, GenerationMembership
from .serializers import (
    GenerationCreateSerializer,
    GenerationMembershipCreateSerializer,
    GenerationSerializer,
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