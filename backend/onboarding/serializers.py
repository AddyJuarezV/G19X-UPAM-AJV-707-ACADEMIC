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
            "assigned_at",
        )

    def get_card_label(self, obj):
        return (
            f"{obj.collaborator.full_name} - "
            f"{obj.collaborator.university_acronym}"
        )


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

        return instance