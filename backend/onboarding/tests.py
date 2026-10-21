from datetime import timedelta
from io import StringIO

from django.core import mail
from django.core.management import call_command
from django.test import override_settings
from django.urls import reverse
from django.utils import timezone

from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import (
    CollaboratorProfile,
    User,
)

from .models import (
    Generation,
    GenerationMembership,
    OnboardingDocument,
)


class OnboardingBaseTestCase(APITestCase):
    def setUp(self):
        self.manager = User.objects.create_user(
            email="encargado@test.local",
            password="Test1234!",
            role=User.Role.ENCARGADO,
        )

        self.collaborator_user = (
            User.objects.create_user(
                email="peter@test.local",
                password="Test1234!",
                role=User.Role.COLABORADOR,
            )
        )

        self.collaborator = (
            CollaboratorProfile.objects.create(
                user=self.collaborator_user,
                full_name="Peter Parker",
                curp="PAPP010101HDFRRL01",
                phone="5551111111",
                institutional_email=(
                    "peter@universidad.test"
                ),
                university=(
                    "Universidad de Prueba"
                ),
                university_acronym="UPT",
                career="Ingeniería en Software",
                required_hours=480,
                cv="tests/peter_cv.txt",
                university_id=(
                    "tests/peter_credencial.txt"
                ),
                application_status=(
                    CollaboratorProfile
                    .ApplicationStatus
                    .APPROVED
                ),
            )
        )

        self.other_user = (
            User.objects.create_user(
                email="miles@test.local",
                password="Test1234!",
                role=User.Role.COLABORADOR,
            )
        )

        self.other_collaborator = (
            CollaboratorProfile.objects.create(
                user=self.other_user,
                full_name="Miles Morales",
                curp="MOMM020202HDFRRL02",
                phone="5552222222",
                institutional_email=(
                    "miles@universidad.test"
                ),
                university=(
                    "Universidad de Prueba"
                ),
                university_acronym="UPT",
                career="Ingeniería en Software",
                required_hours=480,
                cv="tests/miles_cv.txt",
                university_id=(
                    "tests/miles_credencial.txt"
                ),
                application_status=(
                    CollaboratorProfile
                    .ApplicationStatus
                    .APPROVED
                ),
            )
        )


class DocumentStateTests(
    OnboardingBaseTestCase
):
    def test_manager_approves_nda_and_marks_complete(
        self,
    ):
        document = (
            OnboardingDocument.objects.create(
                collaborator=self.collaborator,
                document_type=(
                    OnboardingDocument
                    .DocumentType
                    .NDA
                ),
                status=(
                    OnboardingDocument
                    .Status
                    .DELIVERED
                ),
                collaborator_file=(
                    "tests/nda_firmado.txt"
                ),
            )
        )

        self.client.force_authenticate(
            user=self.manager
        )

        response = self.client.post(
            reverse(
                "manager-review-document",
                args=[document.id],
            ),
            {
                "decision": "APPROVE",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        document.refresh_from_db()

        self.assertEqual(
            document.status,
            OnboardingDocument
            .Status
            .COMPLETE,
        )

        self.assertEqual(
            document.correction_reason,
            "",
        )


    def test_manager_approves_presentation_and_requests_signature(
        self,
    ):
        document = (
            OnboardingDocument.objects.create(
                collaborator=self.collaborator,
                document_type=(
                    OnboardingDocument
                    .DocumentType
                    .PRESENTATION_LETTER
                ),
                status=(
                    OnboardingDocument
                    .Status
                    .DELIVERED
                ),
                collaborator_file=(
                    "tests/presentacion.txt"
                ),
            )
        )

        self.client.force_authenticate(
            user=self.manager
        )

        response = self.client.post(
            reverse(
                "manager-review-document",
                args=[document.id],
            ),
            {
                "decision": "APPROVE",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        document.refresh_from_db()

        self.assertEqual(
            document.status,
            OnboardingDocument
            .Status
            .PENDING_SIGNATURE,
        )


    def test_collaborator_cannot_upload_another_users_document(
        self,
    ):
        foreign_document = (
            OnboardingDocument.objects.create(
                collaborator=(
                    self.other_collaborator
                ),
                document_type=(
                    OnboardingDocument
                    .DocumentType
                    .PRESENTATION_LETTER
                ),
                status=(
                    OnboardingDocument
                    .Status
                    .PENDING
                ),
            )
        )

        self.client.force_authenticate(
            user=self.collaborator_user
        )

        response = self.client.post(
            reverse(
                "upload-my-onboarding-document",
                args=[
                    foreign_document.id
                ],
            ),
            {},
            format="multipart",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

        foreign_document.refresh_from_db()

        self.assertEqual(
            foreign_document.status,
            OnboardingDocument
            .Status
            .PENDING,
        )


class GenerationRulesTests(
    OnboardingBaseTestCase
):
    def test_closed_generation_rejects_new_member(
        self,
    ):
        generation = Generation.objects.create(
            number=99,
            status=Generation.Status.CLOSED,
            closed_at=timezone.now(),
        )

        self.client.force_authenticate(
            user=self.manager
        )

        response = self.client.post(
            reverse(
                "generation-add-member",
                args=[generation.id],
            ),
            {
                "collaborator_id":
                    self.collaborator.id,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertFalse(
            GenerationMembership.objects.filter(
                collaborator=self.collaborator
            ).exists()
        )


@override_settings(
    EMAIL_BACKEND=(
        "django.core.mail.backends."
        "locmem.EmailBackend"
    )
)
class AutomaticReminderTests(
    OnboardingBaseTestCase
):
    def test_stalled_document_sends_only_one_reminder_within_interval(
        self,
    ):
        document = (
            OnboardingDocument.objects.create(
                collaborator=self.collaborator,
                document_type=(
                    OnboardingDocument
                    .DocumentType
                    .PRESENTATION_LETTER
                ),
                status=(
                    OnboardingDocument
                    .Status
                    .PENDING
                ),
            )
        )

        old_date = (
            timezone.now() -
            timedelta(days=3)
        )

        OnboardingDocument.objects.filter(
            pk=document.pk
        ).update(
            updated_at=old_date,
            last_reminder_at=None,
        )

        first_output = StringIO()

        call_command(
            "revisar_pendientes",
            days=2,
            stdout=first_output,
        )

        document.refresh_from_db()

        self.assertEqual(
            len(mail.outbox),
            1,
        )

        self.assertIsNotNone(
            document.last_reminder_at
        )

        self.assertIn(
            self.collaborator_user.email,
            mail.outbox[0].to,
        )

        self.assertIn(
            "Carta de presentación",
            mail.outbox[0].subject,
        )

        second_output = StringIO()

        call_command(
            "revisar_pendientes",
            days=2,
            stdout=second_output,
        )

        self.assertEqual(
            len(mail.outbox),
            1,
        )

        self.assertIn(
            "Pendientes detectados: 0",
            second_output.getvalue(),
        )