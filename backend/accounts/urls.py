from django.urls import path

from .views import CollaboratorRegistrationView


urlpatterns = [
    path(
        "register/",
        CollaboratorRegistrationView.as_view(),
        name="collaborator-register",
    ),
]