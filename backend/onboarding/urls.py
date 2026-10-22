from django.urls import path

from .views import (
    AddGenerationMemberView,
    AvailableCollaboratorsView,
    CloseGenerationView,
    GenerationCreateView,
    GenerationDetailView,
    GenerationListView,
    MyOnboardingDocumentsView,
    UploadMyOnboardingDocumentView,
    ManagerPendingDocumentsView,
    ManagerReviewDocumentView,
    UploadCompanySignedDocumentView,
    ConfirmMyDocumentReceiptView,
    UploadCompanyTemplateView,
    MyAutomaticNotificationsView,
)


urlpatterns = [
    path(
        "generations/",
        GenerationListView.as_view(),
        name="generation-list",
    ),

    path(
        "generations/create/",
        GenerationCreateView.as_view(),
        name="generation-create",
    ),

    path(
        "generations/<int:pk>/members/",
        AddGenerationMemberView.as_view(),
        name="generation-add-member",
    ),

    path(
        "generations/<int:pk>/close/",
        CloseGenerationView.as_view(),
        name="generation-close",
    ),

    path(
    "collaborators/available/",
    AvailableCollaboratorsView.as_view(),
    name="available-collaborators",
    ),

    path(
    "generations/<int:pk>/",
    GenerationDetailView.as_view(),
    name="generation-detail",
    ),

    path(
    "documents/mine/",
    MyOnboardingDocumentsView.as_view(),
    name="my-onboarding-documents",
    ),
  
    path(
    "documents/<int:pk>/upload/",
    UploadMyOnboardingDocumentView.as_view(),
    name="upload-my-onboarding-document",
    ),

    path(
    "documents/pending/",
    ManagerPendingDocumentsView.as_view(),
    name="manager-pending-documents",
    ),

    path(
    "documents/<int:pk>/review/",
    ManagerReviewDocumentView.as_view(),
    name="manager-review-document",
    ),

    path(
    "documents/<int:pk>/company-sign/",
    UploadCompanySignedDocumentView.as_view(),
    name="upload-company-signed-document",
    ),

    path(
    "documents/<int:pk>/confirm-receipt/",
    ConfirmMyDocumentReceiptView.as_view(),
    name="confirm-my-document-receipt",
    ),

    path(
    "documents/<int:pk>/company-template/",
    UploadCompanyTemplateView.as_view(),
    name="upload-company-template",
    ),

    path(
    "notifications/mine/",
    MyAutomaticNotificationsView.as_view(),
    name="my-automatic-notifications",
    ),

]