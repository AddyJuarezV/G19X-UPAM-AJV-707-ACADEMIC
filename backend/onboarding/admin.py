from django import forms
from django.contrib import admin
from django.db.models import Q

from accounts.models import CollaboratorProfile
from .models import Generation, GenerationMembership


@admin.register(Generation)
class GenerationAdmin(admin.ModelAdmin):
    list_display = (
        "number",
        "status",
        "created_at",
        "closed_at",
    )

    list_filter = (
        "status",
    )

    search_fields = (
        "number",
    )

    readonly_fields = (
        "created_at",
        "closed_at",
    )


class GenerationMembershipAdminForm(forms.ModelForm):
    class Meta:
        model = GenerationMembership
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        current_collaborator_id = None
        current_generation_id = None

        if self.instance and self.instance.pk:
            current_collaborator_id = self.instance.collaborator_id
            current_generation_id = self.instance.generation_id

        collaborator_filter = Q(
            application_status=CollaboratorProfile.ApplicationStatus.APPROVED,
            generation_membership__isnull=True,
        )

        if current_collaborator_id:
            collaborator_filter |= Q(pk=current_collaborator_id)

        self.fields["collaborator"].queryset = (
            CollaboratorProfile.objects
            .filter(collaborator_filter)
            .order_by("full_name")
        )

        generation_filter = Q(
            status=Generation.Status.OPEN
        )

        if current_generation_id:
            generation_filter |= Q(pk=current_generation_id)

        self.fields["generation"].queryset = (
            Generation.objects
            .filter(generation_filter)
            .order_by("number")
        )


@admin.register(GenerationMembership)
class GenerationMembershipAdmin(admin.ModelAdmin):
    form = GenerationMembershipAdminForm

    list_display = (
        "collaborator",
        "generation",
        "assigned_at",
    )

    list_filter = (
        "generation",
    )

    search_fields = (
        "collaborator__full_name",
        "collaborator__university_acronym",
    )

    readonly_fields = (
        "assigned_at",
    )