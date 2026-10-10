from django.urls import path

from .views import (
    AddGenerationMemberView,
    AvailableCollaboratorsView,
    CloseGenerationView,
    GenerationCreateView,
    GenerationListView,
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
]