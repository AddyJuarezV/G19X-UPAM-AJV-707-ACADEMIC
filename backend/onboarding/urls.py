from django.urls import path

from .views import GenerationListView


urlpatterns = [
    path(
        "generations/",
        GenerationListView.as_view(),
        name="generation-list",
    ),
]