from django.urls import path

from .current_user import CurrentUserView
from .views import (
    CollaboratorRegistrationView,
    MyCollaboratorProfileView,
    PendingApplicationsView,
    ReviewApplicationView,
    SubmitApplicationView,
)


urlpatterns = [
    path(
        "me/",
        CurrentUserView.as_view(),
        name="current-user",
    ),
    path(
        "register/",
        CollaboratorRegistrationView.as_view(),
        name="collaborator-register",
    ),
    path(
        "application/submit/",
        SubmitApplicationView.as_view(),
        name="application-submit",
    ),
    path(
        "applications/pending/",
        PendingApplicationsView.as_view(),
        name="applications-pending",
    ),
    path(
        "applications/<int:pk>/review/",
        ReviewApplicationView.as_view(),
        name="application-review",
    ),
    path(
        "profile/",
        MyCollaboratorProfileView.as_view(),
        name="my-collaborator-profile",
    ),
]