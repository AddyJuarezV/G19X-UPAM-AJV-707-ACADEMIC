from django.urls import path



from .views import (
    CollaboratorRegistrationView,
    SubmitApplicationView,
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
]