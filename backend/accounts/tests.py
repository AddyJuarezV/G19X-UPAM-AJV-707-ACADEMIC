from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from .models import (
    CollaboratorProfile,
    User,
)


class AccountsBaseTestCase(APITestCase):
    def setUp(self):
        self.manager = User.objects.create_user(
            email="encargado@test.local",
            password="Test1234!",
            role=User.Role.ENCARGADO,
        )

        self.collaborator_user = (
            User.objects.create_user(
                email="miguel@test.local",
                password="Test1234!",
                role=User.Role.COLABORADOR,
            )
        )

        self.profile = (
            CollaboratorProfile.objects.create(
                user=self.collaborator_user,
                full_name="Miguel O'Hara",
                curp="OAHM990101HDFHRG01",
                phone="5553333333",
                institutional_email=(
                    "miguel@universidad.test"
                ),
                university=(
                    "Universidad Tecnológica "
                    "del Multiverso"
                ),
                university_acronym="UTM",
                career="Ingeniería en Software",
                required_hours=480,
                cv="tests/miguel_cv.txt",
                university_id=(
                    "tests/miguel_credencial.txt"
                ),
                application_status=(
                    CollaboratorProfile
                    .ApplicationStatus
                    .DRAFT
                ),
            )
        )


class ApplicationSubmitTests(
    AccountsBaseTestCase
):
    def test_draft_application_can_be_submitted(
        self,
    ):
        self.client.force_authenticate(
            user=self.collaborator_user
        )

        response = self.client.post(
            reverse(
                "application-submit"
            ),
            {},
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.profile.refresh_from_db()

        self.assertEqual(
            self.profile.application_status,
            CollaboratorProfile
            .ApplicationStatus
            .IN_REVIEW,
        )


    def test_approved_application_cannot_be_submitted_again(
        self,
    ):
        self.profile.application_status = (
            CollaboratorProfile
            .ApplicationStatus
            .APPROVED
        )

        self.profile.save(
            update_fields=[
                "application_status",
            ]
        )

        self.client.force_authenticate(
            user=self.collaborator_user
        )

        response = self.client.post(
            reverse(
                "application-submit"
            ),
            {},
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.profile.refresh_from_db()

        self.assertEqual(
            self.profile.application_status,
            CollaboratorProfile
            .ApplicationStatus
            .APPROVED,
        )


class ApplicationReviewTests(
    AccountsBaseTestCase
):
    def test_collaborator_cannot_review_application(
        self,
    ):
        self.profile.application_status = (
            CollaboratorProfile
            .ApplicationStatus
            .IN_REVIEW
        )

        self.profile.save(
            update_fields=[
                "application_status",
            ]
        )

        self.client.force_authenticate(
            user=self.collaborator_user
        )

        response = self.client.post(
            reverse(
                "application-review",
                args=[self.profile.id],
            ),
            {
                "decision": "APPROVE",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

        self.profile.refresh_from_db()

        self.assertEqual(
            self.profile.application_status,
            CollaboratorProfile
            .ApplicationStatus
            .IN_REVIEW,
        )


    def test_correction_requires_reason(
        self,
    ):
        self.profile.application_status = (
            CollaboratorProfile
            .ApplicationStatus
            .IN_REVIEW
        )

        self.profile.save(
            update_fields=[
                "application_status",
            ]
        )

        self.client.force_authenticate(
            user=self.manager
        )

        response = self.client.post(
            reverse(
                "application-review",
                args=[self.profile.id],
            ),
            {
                "decision":
                    "REQUEST_CORRECTION",
                "correction_reason": "",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.profile.refresh_from_db()

        self.assertEqual(
            self.profile.application_status,
            CollaboratorProfile
            .ApplicationStatus
            .IN_REVIEW,
        )


    def test_complete_correction_and_approval_flow(
        self,
    ):
        self.client.force_authenticate(
            user=self.collaborator_user
        )

        submit_response = self.client.post(
            reverse(
                "application-submit"
            ),
            {},
            format="json",
        )

        self.assertEqual(
            submit_response.status_code,
            status.HTTP_200_OK,
        )

        self.profile.refresh_from_db()

        self.assertEqual(
            self.profile.application_status,
            CollaboratorProfile
            .ApplicationStatus
            .IN_REVIEW,
        )


        self.client.force_authenticate(
            user=self.manager
        )

        correction_response = (
            self.client.post(
                reverse(
                    "application-review",
                    args=[self.profile.id],
                ),
                {
                    "decision":
                        "REQUEST_CORRECTION",
                    "correction_reason": (
                        "Corrige las horas "
                        "a cumplir."
                    ),
                },
                format="json",
            )
        )

        self.assertEqual(
            correction_response.status_code,
            status.HTTP_200_OK,
        )

        self.profile.refresh_from_db()

        self.assertEqual(
            self.profile.application_status,
            CollaboratorProfile
            .ApplicationStatus
            .NEEDS_CORRECTION,
        )

        self.assertEqual(
            self.profile.correction_reason,
            "Corrige las horas a cumplir.",
        )


        self.client.force_authenticate(
            user=self.collaborator_user
        )

        patch_response = self.client.patch(
            reverse(
                "my-collaborator-profile"
            ),
            {
                "required_hours": 500,
            },
            format="json",
        )

        self.assertEqual(
            patch_response.status_code,
            status.HTTP_200_OK,
        )

        self.profile.refresh_from_db()

        self.assertEqual(
            self.profile.required_hours,
            500,
        )


        resubmit_response = (
            self.client.post(
                reverse(
                    "application-submit"
                ),
                {},
                format="json",
            )
        )

        self.assertEqual(
            resubmit_response.status_code,
            status.HTTP_200_OK,
        )

        self.profile.refresh_from_db()

        self.assertEqual(
            self.profile.application_status,
            CollaboratorProfile
            .ApplicationStatus
            .IN_REVIEW,
        )

        self.assertEqual(
            self.profile.correction_reason,
            "",
        )


        self.client.force_authenticate(
            user=self.manager
        )

        approval_response = (
            self.client.post(
                reverse(
                    "application-review",
                    args=[self.profile.id],
                ),
                {
                    "decision": "APPROVE",
                },
                format="json",
            )
        )

        self.assertEqual(
            approval_response.status_code,
            status.HTTP_200_OK,
        )

        self.profile.refresh_from_db()

        self.assertEqual(
            self.profile.application_status,
            CollaboratorProfile
            .ApplicationStatus
            .APPROVED,
        )

        self.assertEqual(
            self.profile.required_hours,
            500,
        )

        self.assertEqual(
            self.profile.correction_reason,
            "",
        )