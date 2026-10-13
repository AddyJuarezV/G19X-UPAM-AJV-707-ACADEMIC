from rest_framework import serializers

from .models import (
    Generation,
    GenerationMembership,
    OnboardingDocument,
)

 
class GenerationMemberSerializer(serializers.ModelSerializer):
    collaborator_id = serializers.IntegerField(
        source="collaborator.id",
        read_only=True,
    )

    full_name = serializers.CharField(
        source="collaborator.full_name",
        read_only=True,
    )

    university = serializers.CharField(
        source="collaborator.university",
        read_only=True,
    )

    university_acronym = serializers.CharField(
        source="collaborator.university_acronym",
        read_only=True,
    )

    career = serializers.CharField(
        source="collaborator.career",
        read_only=True,
    )

    application_status = serializers.CharField(
        source="collaborator.application_status",
        read_only=True,
    )

    card_label = serializers.SerializerMethodField()
    visual_status = serializers.SerializerMethodField()
    documents_completed = serializers.SerializerMethodField()
    documents_total = serializers.SerializerMethodField()

    class Meta:
        model = GenerationMembership
        fields = (
            "id",
            "collaborator_id",
            "card_label",
            "full_name",
            "university",
            "university_acronym",
            "career",
            "application_status",
            "visual_status",
            "documents_completed",
            "documents_total",
            "assigned_at",
        )

    def get_card_label(self, obj):
        return (
            f"{obj.collaborator.full_name} - "
            f"{obj.collaborator.university_acronym}"
        )

    def _documents(self, obj):
        return list(
            obj.collaborator.onboarding_documents.all()
        )

    def get_documents_total(self, obj):
        return len(self._documents(obj))

    def get_documents_completed(self, obj):
        return sum(
            document.status == OnboardingDocument.Status.COMPLETE
            for document in self._documents(obj)
        )

    def get_visual_status(self, obj):
        documents = self._documents(obj)

        if any(
            document.status
            == OnboardingDocument.Status.NEEDS_CORRECTION
            for document in documents
        ):
            return "RED"

        required_types = {
            OnboardingDocument.DocumentType.NDA,
            OnboardingDocument.DocumentType.PRESENTATION_LETTER,
            OnboardingDocument.DocumentType.ACCEPTANCE_LETTER,
        }

        documents_by_type = {
            document.document_type: document
            for document in documents
        }

        all_required_complete = all(
            document_type in documents_by_type
            and documents_by_type[document_type].status
            == OnboardingDocument.Status.COMPLETE
            for document_type in required_types
        )

        if all_required_complete:
            return "GREEN"

        return "YELLOW"

class GenerationSerializer(serializers.ModelSerializer):
    members = GenerationMemberSerializer(
        many=True,
        read_only=True,
    )

    members_count = serializers.SerializerMethodField()

    class Meta:
        model = Generation
        fields = (
            "id",
            "number",
            "status",
            "created_at",
            "closed_at",
            "members_count",
            "members",
        )

    def get_members_count(self, obj):
        return obj.members.count()

from accounts.models import CollaboratorProfile


class GenerationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Generation
        fields = (
            "id",
            "number",
        )
        read_only_fields = ("id",)

    def validate_number(self, value):
        if Generation.objects.filter(number=value).exists():
            raise serializers.ValidationError(
                "Ya existe una generación con este número."
            )

        return value


class GenerationMembershipCreateSerializer(serializers.Serializer):
    collaborator_id = serializers.IntegerField()

    def validate_collaborator_id(self, value):
        try:
            collaborator = CollaboratorProfile.objects.get(pk=value)
        except CollaboratorProfile.DoesNotExist:
            raise serializers.ValidationError(
                "El colaborador no existe."
            )

        if (
            collaborator.application_status
            != CollaboratorProfile.ApplicationStatus.APPROVED
        ):
            raise serializers.ValidationError(
                "Solo los colaboradores aprobados pueden asignarse a una generación."
            )

        if hasattr(collaborator, "generation_membership"):
            raise serializers.ValidationError(
                "El colaborador ya pertenece a una generación."
            )

        return value

class AvailableCollaboratorSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        source="user.email",
        read_only=True,
    )

    class Meta:
        model = CollaboratorProfile
        fields = (
            "id",
            "full_name",
            "email",
            "university",
            "university_acronym",
            "career",
            "required_hours",
            "application_status",
        )

class OnboardingDocumentSerializer(serializers.ModelSerializer):
    document_type_label = serializers.CharField(
        source="get_document_type_display",
        read_only=True,
    )

    status_label = serializers.CharField(
        source="get_status_display",
        read_only=True,
    )

    class Meta:
        model = OnboardingDocument
        fields = (
            "id",
            "document_type",
            "document_type_label",
            "status",
            "status_label",
            "company_template",
            "collaborator_file",
            "company_signed_file",
            "correction_reason",
            "created_at",
            "updated_at",
        )

        read_only_fields = fields

class CollaboratorDocumentUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnboardingDocument
        fields = (
            "collaborator_file",
        )

    def validate_collaborator_file(self, value):
        if not value:
            raise serializers.ValidationError(
                "Debes seleccionar un archivo."
            )

        return value

    def update(self, instance, validated_data):
        old_file = instance.collaborator_file

        old_name = old_file.name if old_file else None
        old_storage = old_file.storage if old_file else None

        instance.collaborator_file = validated_data["collaborator_file"]
        instance.status = OnboardingDocument.Status.DELIVERED
        instance.correction_reason = ""

        instance.save(
            update_fields=[
                "collaborator_file",
                "status",
                "correction_reason",
                "updated_at",
            ]
        )

        new_name = (
            instance.collaborator_file.name
            if instance.collaborator_file
            else None
        )

        if (
            old_name
            and old_storage
            and old_name != new_name
            and old_storage.exists(old_name)
        ):
            old_storage.delete(old_name)

        return instance

class ManagerPendingDocumentSerializer(serializers.ModelSerializer):
    collaborator_id = serializers.IntegerField(
        source="collaborator.id",
        read_only=True,
    )

    collaborator_name = serializers.CharField(
        source="collaborator.full_name",
        read_only=True,
    )

    university_acronym = serializers.CharField(
        source="collaborator.university_acronym",
        read_only=True,
    )

    collaborator_label = serializers.SerializerMethodField()

    document_type_label = serializers.CharField(
        source="get_document_type_display",
        read_only=True,
    )

    status_label = serializers.CharField(
        source="get_status_display",
        read_only=True,
    )

    class Meta:
        model = OnboardingDocument
        fields = (
            "id",
            "collaborator_id",
            "collaborator_name",
            "university_acronym",
            "collaborator_label",
            "document_type",
            "document_type_label",
            "status",
            "status_label",
            "collaborator_file",
            "correction_reason",
            "updated_at",
        )

        read_only_fields = fields

    def get_collaborator_label(self, obj):
        return (
            f"{obj.collaborator.full_name} - "
            f"{obj.collaborator.university_acronym}"
        )

class ManagerDocumentReviewSerializer(serializers.Serializer):
    decision = serializers.ChoiceField(
        choices=(
            ("APPROVE", "Aprobar"),
            ("REQUEST_CORRECTION", "Solicitar corrección"),
        )
    )

    correction_reason = serializers.CharField(
        required=False,
        allow_blank=True,
    )

    def validate(self, attrs):
        decision = attrs["decision"]
        correction_reason = attrs.get(
            "correction_reason",
            "",
        ).strip()

        if (
            decision == "REQUEST_CORRECTION"
            and not correction_reason
        ):
            raise serializers.ValidationError(
                {
                    "correction_reason": (
                        "Debes indicar el motivo de la corrección."
                    )
                }
            )

        attrs["correction_reason"] = correction_reason

        return attrs

class CompanySignedDocumentUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnboardingDocument
        fields = (
            "company_signed_file",
        )

    def validate_company_signed_file(self, value):
        if not value:
            raise serializers.ValidationError(
                "Debes seleccionar el documento firmado."
            )

        return value

    def update(self, instance, validated_data):
        old_file = instance.company_signed_file
        old_name = old_file.name if old_file else None
        old_storage = old_file.storage if old_file else None

        instance.company_signed_file = validated_data[
            "company_signed_file"
        ]
        instance.status = OnboardingDocument.Status.DOWNLOADABLE

        instance.save(
            update_fields=[
                "company_signed_file",
                "status",
                "updated_at",
            ]
        )

        new_name = (
            instance.company_signed_file.name
            if instance.company_signed_file
            else None
        )

        if (
            old_name
            and old_storage
            and old_name != new_name
            and old_storage.exists(old_name)
        ):
            old_storage.delete(old_name)

        return instance

class CompanyTemplateUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnboardingDocument
        fields = (
            "company_template",
        )

    def validate_company_template(self, value):
        if not value:
            raise serializers.ValidationError(
                "Debes seleccionar una plantilla."
            )

        return value

    def update(self, instance, validated_data):
        old_file = instance.company_template
        old_name = old_file.name if old_file else None
        old_storage = old_file.storage if old_file else None

        instance.company_template = validated_data["company_template"]

        instance.save(
            update_fields=[
                "company_template",
                "updated_at",
            ]
        )

        new_name = (
            instance.company_template.name
            if instance.company_template
            else None
        )

        if (
            old_name
            and old_storage
            and old_name != new_name
            and old_storage.exists(old_name)
        ):
            old_storage.delete(old_name)

        return instance