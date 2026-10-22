from datetime import timedelta

from django.conf import settings
from django.core.mail import send_mail
from django.core.management.base import BaseCommand, CommandError
from django.db.models import Q
from django.utils import timezone

from accounts.models import User
from onboarding.models import (
    AutomaticNotification,
    OnboardingDocument,
)


class Command(BaseCommand):
    help = (
        "Detecta documentos de onboarding detenidos "
        "y envía recordatorios al responsable de la "
        "siguiente acción."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--days",
            type=int,
            default=2,
            help=(
                "Días sin movimiento antes de generar "
                "un recordatorio. Valor predeterminado: 2."
            ),
        )

        parser.add_argument(
            "--repeat-hours",
            type=int,
            default=24,
            help=(
                "Horas mínimas antes de repetir un "
                "recordatorio para el mismo documento. "
                "Valor predeterminado: 24."
            ),
        )

        parser.add_argument(
            "--dry-run",
            action="store_true",
            help=(
                "Muestra los recordatorios que se "
                "generarían sin enviar correos ni "
                "modificar la base de datos."
            ),
        )

    def handle(self, *args, **options):
        days = options["days"]
        repeat_hours = options[
            "repeat_hours"
        ]
        dry_run = options["dry_run"]

        if days < 0:
            raise CommandError(
                "--days no puede ser negativo."
            )

        if repeat_hours < 0:
            raise CommandError(
                "--repeat-hours no puede ser negativo."
            )

        now = timezone.now()

        stalled_cutoff = (
            now -
            timedelta(days=days)
        )

        reminder_cutoff = (
            now -
            timedelta(
                hours=repeat_hours
            )
        )

        manager_users = list(
            User.objects.filter(
                role=User.Role.ENCARGADO,
                is_active=True,
            )
            .exclude(email="")
        )

        documents = (
            OnboardingDocument.objects
            .select_related(
                "collaborator",
                "collaborator__user",
            )
            .exclude(
                status=(
                    OnboardingDocument
                    .Status
                    .COMPLETE
                )
            )
            .filter(
                updated_at__lte=
                    stalled_cutoff
            )
            .filter(
                Q(
                    last_reminder_at__isnull=True
                )
                |
                Q(
                    last_reminder_at__lte=
                        reminder_cutoff
                )
            )
            .order_by(
                "updated_at",
                "id",
            )
        )

        self.stdout.write(
            ""
        )

        self.stdout.write(
            "=== Seguimiento automático de PluriOne ==="
        )

        self.stdout.write(
            f"Umbral de pendientes: {days} días"
        )

        self.stdout.write(
            f"Repetición mínima: {repeat_hours} horas"
        )

        if dry_run:
            self.stdout.write(
                "Modo: SIMULACIÓN"
            )
        else:
            self.stdout.write(
                "Modo: ENVÍO"
            )

        self.stdout.write(
            ""
        )

        detected = 0
        sent = 0
        skipped = 0

        for document in documents:
            detected += 1

            (
               responsible,
               recipient_users,
               action_text,
            ) = self.get_next_action(
               document,
               manager_users,
            )

            recipient_emails = [
                user.email
                for user in recipient_users
                if user.email
            ]

            stalled_days = max(
                (
                    now -
                    document.updated_at
                ).days,
                0,
            )

            label = (
                document
                .get_document_type_display()
            )

            collaborator = (
                document
                .collaborator
            )

            self.stdout.write(
                (
                    f"- {collaborator.full_name} | "
                    f"{label} | "
                    f"{document.status} | "
                    f"{stalled_days} días sin movimiento"
                )
            )

            self.stdout.write(
                (
                    "  Responsable: "
                    f"{responsible}"
                )
            )

            self.stdout.write(
                (
                    "  Acción: "
                    f"{action_text}"
                )
            )

            if not recipient_emails:
                skipped += 1

                self.stdout.write(
                    self.style.WARNING(
                        "  Sin destinatarios configurados."
                    )
                )

                continue

            self.stdout.write(
                (
                    "  Destinatarios: "
                    f"{', '.join(recipient_emails)}"
                )
            )

            if dry_run:
                self.stdout.write(
                    self.style.WARNING(
                        "  Recordatorio simulado."
                    )
                )

                continue

            subject = (
                "[PluriOne] Pendiente de incorporación: "
                f"{label}"
            )

            message = self.build_message(
                document=document,
                responsible=responsible,
                action_text=action_text,
                stalled_days=stalled_days,
            )

            send_mail(
                subject=subject,
                message=message,
                from_email=(
                    settings
                    .DEFAULT_FROM_EMAIL
                ),
                recipient_list=recipient_emails,
                fail_silently=False,
            )

            for recipient_user in recipient_users:
                AutomaticNotification.objects.create(
                    recipient=recipient_user,
                    document=document,
                    title=(
                        f"{label}: "
                        "recordatorio automático"
                    ),
                    message=(
                        f"{label} lleva "
                        f"{stalled_days} días "
                        "sin movimiento. "
                        f"{action_text}"
                    ),
                    responsible=responsible,
                    document_status=document.status,
                    stalled_days=stalled_days,
                 )

            document.last_reminder_at = (
                now
            )

            document.save(
                update_fields=[
                    "last_reminder_at",
                ]
            )

            sent += 1

            self.stdout.write(
                self.style.SUCCESS(
                    "  Recordatorio generado."
                )
            )

        self.stdout.write(
            ""
        )

        self.stdout.write(
            "=== Resultado ==="
        )

        self.stdout.write(
            f"Pendientes detectados: {detected}"
        )

        self.stdout.write(
            f"Recordatorios enviados: {sent}"
        )

        self.stdout.write(
            f"Pendientes omitidos: {skipped}"
        )

        if detected == 0:
            self.stdout.write(
                self.style.SUCCESS(
                    "No existen pendientes que requieran recordatorio."
                )
            )

    def get_next_action(
        self,
        document,
        manager_users,
    ):
        collaborator_user = (
            document
            .collaborator
            .user
        )

        requires_template = (
            document.document_type
            in {
                OnboardingDocument
                .DocumentType
                .NDA,

                OnboardingDocument
                .DocumentType
                .ACCEPTANCE_LETTER,
            }
        )

        if (
            document.status
            ==
            OnboardingDocument
            .Status
            .PENDING
        ):
            if (
                requires_template
                and
                not document.company_template
            ):
                return (
                    "PluriOne",
                    manager_users,
                    (
                        "Publicar la plantilla "
                        "del documento."
                    ),
                )

            return (
                "Colaborador",
                [collaborator_user],
                (
                    "Completar y entregar "
                    "el documento."
                ),
            )

        if (
            document.status
            in {
                OnboardingDocument
                .Status
                .DELIVERED,

                OnboardingDocument
                .Status
                .IN_REVIEW,
            }
        ):
            return (
                "PluriOne",
                manager_users,
                (
                    "Revisar el documento "
                    "entregado."
                ),
            )

        if (
            document.status
            ==
            OnboardingDocument
            .Status
            .NEEDS_CORRECTION
        ):
            return (
                "Colaborador",
                [collaborator_user],
                (
                    "Corregir y volver a "
                    "entregar el documento."
                ),
            )

        if (
            document.status
            ==
            OnboardingDocument
            .Status
            .PENDING_SIGNATURE
        ):
            return (
                "PluriOne",
                manager_users,
                (
                    "Firmar y devolver "
                    "el documento."
                ),
            )

        if (
            document.status
            in {
                OnboardingDocument
                .Status
                .SIGNED,

                OnboardingDocument
                .Status
                .DOWNLOADABLE,
            }
        ):
            return (
                "Colaborador",
                [collaborator_user],
                (
                    "Descargar el documento "
                    "y confirmar su recepción."
                ),
            )

        return (
            "Sin responsable",
            [],
            "Revisar manualmente el estado.",
        )

    def build_message(
        self,
        document,
        responsible,
        action_text,
        stalled_days,
    ):
        collaborator = (
            document.collaborator
        )

        document_label = (
            document
            .get_document_type_display()
        )

        status_label = (
            document
            .get_status_display()
        )

        updated_at = (
            timezone.localtime(
                document.updated_at
            )
            .strftime(
                "%d/%m/%Y %H:%M"
            )
        )

        return (
            "Seguimiento automático de PluriOne\n\n"
            f"Colaborador: {collaborator.full_name}\n"
            f"Documento: {document_label}\n"
            f"Estado: {status_label}\n"
            f"Último movimiento: {updated_at}\n"
            f"Días sin movimiento: {stalled_days}\n"
            f"Responsable actual: {responsible}\n\n"
            f"Acción requerida: {action_text}\n\n"
            "Este recordatorio fue generado "
            "automáticamente por el sistema "
            "de seguimiento de incorporación "
            "de PluriOne."
        )