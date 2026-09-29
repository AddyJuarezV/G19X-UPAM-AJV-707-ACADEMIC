from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("El correo electrónico es obligatorio.")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("role", User.Role.ENCARGADO)

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None

    email = models.EmailField(
        unique=True,
        verbose_name="correo electrónico",
    )

    class Role(models.TextChoices):
        COLABORADOR = "COLABORADOR", "Colaborador"
        ENCARGADO = "ENCARGADO", "Encargado"

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.COLABORADOR,
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email



class CollaboratorProfile(models.Model):
    class ApplicationStatus(models.TextChoices):
        DRAFT = "DRAFT", "Borrador"
        IN_REVIEW = "IN_REVIEW", "En revisión"
        NEEDS_CORRECTION = "NEEDS_CORRECTION", "Requiere corrección"
        APPROVED = "APPROVED", "Aprobado"

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="collaborator_profile",
    )

    full_name = models.CharField(
        max_length=200,
        verbose_name="nombre completo",
    )

    curp = models.CharField(
        max_length=18,
        unique=True,
        verbose_name="CURP",
    )

    phone = models.CharField(
        max_length=20,
        verbose_name="teléfono",
    )

    institutional_email = models.EmailField(
        verbose_name="correo institucional",
    )

    university = models.CharField(
        max_length=200,
        verbose_name="universidad",
    )

    university_acronym = models.CharField(
        max_length=20,
        verbose_name="siglas de universidad",
    )

    career = models.CharField(
        max_length=200,
        verbose_name="carrera",
    )

    required_hours = models.PositiveIntegerField(
        verbose_name="horas a cumplir",
    )

    cv = models.FileField(
        upload_to="collaborators/cv/",
        verbose_name="CV",
    )

    university_id = models.FileField(
        upload_to="collaborators/university_id/",
        verbose_name="credencial universitaria",
    )

    application_status = models.CharField(
        max_length=30,
        choices=ApplicationStatus.choices,
        default=ApplicationStatus.DRAFT,
        verbose_name="estado de solicitud",
    )

    correction_reason = models.TextField(
        blank=True,
        verbose_name="motivo de corrección",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="fecha de creación",
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="última actualización",
    )

    def __str__(self):
        return f"{self.full_name} - {self.university_acronym}"