from django.urls import path



from .views import (
    CollaboratorRegistrationView,
    SubmitApplicationView,

)

from .views import (
    CollaboratorRegistrationView,
    PendingApplicationsView,
    SubmitApplicationView,
    ReviewApplicationView,
)

urlpatterns = [
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
]

