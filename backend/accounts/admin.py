from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import CollaboratorProfile, User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ("email",)

    list_display = (
        "email",
        "role",
        "is_staff",
        "is_active",
    )

    search_fields = ("email",)

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "password",
                )
            },
        ),
        (
            "Permisos",
            {
                "fields": (
                    "role",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (
            "Fechas",
            {
                "fields": (
                    "last_login",
                    "date_joined",
                )
            },
        ),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "role",
                    "is_active",
                    "is_staff",
                ),
            },
        ),
    )


@admin.register(CollaboratorProfile)
class CollaboratorProfileAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "university_acronym",
        "career",
        "application_status",
        "created_at",
    )

    list_filter = (
        "application_status",
        "university",
    )

    search_fields = (
        "full_name",
        "curp",
        "user__email",
        "university",
        "career",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )