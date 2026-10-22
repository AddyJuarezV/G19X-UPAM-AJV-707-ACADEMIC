from django.shortcuts import get_object_or_404
from django.db import transaction
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import FormParser, MultiPartParser

from accounts.models import CollaboratorProfile

from .models import (
    AutomaticNotification,
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
    ManagerPendingDocumentSerializer,
    ManagerDocumentReviewSerializer,
    CompanySignedDocumentUploadSerializer,
    CompanyTemplateUploadSerializer,
    AutomaticNotificationSerializer,
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
               "members__collaborator",
               "members__collaborator__onboarding_documents",
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
                 "members__collaborator",
                 "members__collaborator__onboarding_documents",
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

    @transaction.atomic
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
            pk=serializer.validated_data[
                "collaborator_id"
            ]
        )

        membership = GenerationMembership.objects.create(
            generation=generation,
            collaborator=collaborator,
        )

        required_document_types = (
            OnboardingDocument.DocumentType.NDA,
            OnboardingDocument.DocumentType.PRESENTATION_LETTER,
            OnboardingDocument.DocumentType.ACCEPTANCE_LETTER,
        )

        onboarding_documents = []

        for document_type in required_document_types:
            document, _ = (
                OnboardingDocument.objects.get_or_create(
                    collaborator=collaborator,
                    document_type=document_type,
                    defaults={
                        "status":
                            OnboardingDocument.Status.PENDING,
                    },
                )
            )

            onboarding_documents.append(
                document.document_type
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
                "onboarding_documents":
                    onboarding_documents,
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

        template_required_types = {
            OnboardingDocument.DocumentType.NDA,
            OnboardingDocument.DocumentType.ACCEPTANCE_LETTER,
        }

        if (
            document.document_type in template_required_types
            and not document.company_template
        ):
            return Response(
                {
                    "detail": (
                        "La empresa todavía no ha publicado "
                        "la plantilla de este documento."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
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

class ManagerPendingDocumentsView(generics.ListAPIView):
    serializer_class = ManagerPendingDocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        validate_manager(self.request.user)

        template_required_types = [
            OnboardingDocument.DocumentType.NDA,
            OnboardingDocument.DocumentType.ACCEPTANCE_LETTER,
        ]

        return (
            OnboardingDocument.objects
            .filter(
                Q(
                    status__in=[
                        OnboardingDocument.Status.DELIVERED,
                        OnboardingDocument.Status.PENDING_SIGNATURE,
                    ]
                )
                |
                (
                    Q(
                        status=OnboardingDocument.Status.PENDING,
                        document_type__in=template_required_types,
                    )
                    &
                    (
                        Q(company_template__isnull=True)
                        |
                        Q(company_template="")
                    )
                )
            )
            .select_related(
                "collaborator",
                "collaborator__user",
            )
            .order_by("updated_at")
        )

class ManagerReviewDocumentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        validate_manager(request.user)

        document = get_object_or_404(
            OnboardingDocument,
            pk=pk,
        )

        if document.status != OnboardingDocument.Status.DELIVERED:
            return Response(
                {
                    "detail": (
                        "Solo pueden revisarse documentos "
                        "en estado DELIVERED."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ManagerDocumentReviewSerializer(
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)

        decision = serializer.validated_data["decision"]

        if decision == "REQUEST_CORRECTION":
            document.status = (
                OnboardingDocument.Status.NEEDS_CORRECTION
            )
            document.correction_reason = (
                serializer.validated_data["correction_reason"]
            )

            message = "Corrección solicitada correctamente."

        else:
            document.correction_reason = ""

            if (
                document.document_type
                == OnboardingDocument.DocumentType.NDA
            ):
                document.status = (
                    OnboardingDocument.Status.COMPLETE
                )

                message = "NDA aprobado y completado correctamente."

            else:
                document.status = (
                    OnboardingDocument.Status.PENDING_SIGNATURE
                )

                message = (
                    "Documento aprobado. "
                    "Queda pendiente la firma de la empresa."
                )

        document.save(
            update_fields=[
                "status",
                "correction_reason",
                "updated_at",
            ]
        )

        return Response(
            {
                "message": message,
                "document": OnboardingDocumentSerializer(
                    document,
                    context={"request": request},
                ).data,
            },
            status=status.HTTP_200_OK,
        )

class UploadCompanySignedDocumentView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, pk):
        validate_manager(request.user)

        document = get_object_or_404(
            OnboardingDocument,
            pk=pk,
        )

        if document.document_type == OnboardingDocument.DocumentType.NDA:
            return Response(
                {
                    "detail": (
                        "El NDA no requiere firma de la empresa."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if (
            document.status
            != OnboardingDocument.Status.PENDING_SIGNATURE
        ):
            return Response(
                {
                    "detail": (
                        "Solo pueden firmarse documentos en estado "
                        "PENDING_SIGNATURE."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = CompanySignedDocumentUploadSerializer(
            document,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {
                "message": (
                    "Documento firmado por la empresa "
                    "y disponible para descarga."
                ),
                "document": OnboardingDocumentSerializer(
                    document,
                    context={"request": request},
                ).data,
            },
            status=status.HTTP_200_OK,
        )

class ConfirmMyDocumentReceiptView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if request.user.role != request.user.Role.COLABORADOR:
            raise PermissionDenied(
                "Solo los colaboradores pueden confirmar sus documentos."
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

        if document.status != OnboardingDocument.Status.DOWNLOADABLE:
            return Response(
                {
                    "detail": (
                        "Solo pueden confirmarse documentos "
                        "disponibles para descarga."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not document.company_signed_file:
            return Response(
                {
                    "detail": (
                        "El documento firmado por la empresa "
                        "no se encuentra disponible."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        document.status = OnboardingDocument.Status.COMPLETE

        document.save(
            update_fields=[
                "status",
                "updated_at",
            ]
        )

        return Response(
            {
                "message": "Recepción del documento confirmada.",
                "document": OnboardingDocumentSerializer(
                    document,
                    context={"request": request},
                ).data,
            },
            status=status.HTTP_200_OK,
        )

class UploadCompanyTemplateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, pk):
        validate_manager(request.user)

        document = get_object_or_404(
            OnboardingDocument,
            pk=pk,
        )

        allowed_types = {
            OnboardingDocument.DocumentType.NDA,
            OnboardingDocument.DocumentType.ACCEPTANCE_LETTER,
        }

        if document.document_type not in allowed_types:
            return Response(
                {
                    "detail": (
                        "Este tipo de documento no requiere "
                        "una plantilla de la empresa."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if document.status != OnboardingDocument.Status.PENDING:
            return Response(
                {
                    "detail": (
                        "La plantilla solo puede publicarse mientras "
                        "el documento se encuentre en estado PENDING."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = CompanyTemplateUploadSerializer(
            document,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {
                "message": "Plantilla publicada correctamente.",
                "document": OnboardingDocumentSerializer(
                    document,
                    context={"request": request},
                ).data,
            },
            status=status.HTTP_200_OK,
        )

class MyAutomaticNotificationsView(
    generics.ListAPIView
):
    serializer_class = (
        AutomaticNotificationSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):
        return (
            AutomaticNotification.objects
            .filter(
                recipient=self.request.user
            )
            .select_related(
                "document",
                "document__collaborator",
            )
            .order_by(
                "-created_at"
            )
        )