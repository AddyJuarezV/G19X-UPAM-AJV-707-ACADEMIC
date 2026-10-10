from rest_framework import serializers

from .models import Generation, GenerationMembership


class GenerationMemberSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(
        source="collaborator.full_name",
        read_only=True,
    )

    university_acronym = serializers.CharField(
        source="collaborator.university_acronym",
        read_only=True,
    )

    application_status = serializers.CharField(
        source="collaborator.application_status",
        read_only=True,
    )

    class Meta:
        model = GenerationMembership
        fields = (
            "id",
            "full_name",
            "university_acronym",
            "application_status",
            "assigned_at",
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