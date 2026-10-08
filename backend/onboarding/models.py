from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

from accounts.models import CollaboratorProfile


class Generation(models.Model):
    class Status(models.TextChoices):
        OPEN = "OPEN", "Abierta"
        CLOSED = "CLOSED", "Cerrada"

    number = models.PositiveIntegerField(
        unique=True,
        verbose_name="número de generación",
    )

    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.OPEN,
        verbose_name="estado",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="fecha de creación",
    )

    closed_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="fecha de cierre",
    )

    def close(self):
        self.status = self.Status.CLOSED
        self.closed_at = timezone.now()
        self.save(
            update_fields=[
                "status",
                "closed_at",
            ]
        )

    def __str__(self):
        return f"Generación {self.number}"


class GenerationMembership(models.Model):
    generation = models.ForeignKey(
        Generation,
        on_delete=models.PROTECT,
        related_name="members",
        verbose_name="generación",
    )

    collaborator = models.OneToOneField(
        CollaboratorProfile,
        on_delete=models.PROTECT,
        related_name="generation_membership",
        verbose_name="colaborador",
    )

    assigned_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="fecha de asignación",
    )

    def clean(self):
        if self.generation.status != Generation.Status.OPEN:
            raise ValidationError(
                "No se pueden agregar colaboradores a una generación cerrada."
            )

        if (
            self.collaborator.application_status
            != CollaboratorProfile.ApplicationStatus.APPROVED
        ):
            raise ValidationError(
                "Solo los colaboradores aprobados pueden asignarse a una generación."
            )

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f"{self.collaborator.full_name} - "
            f"{self.collaborator.university_acronym} / "
            f"{self.generation}"
        )