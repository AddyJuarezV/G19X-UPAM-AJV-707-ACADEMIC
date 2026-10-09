from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .models import Generation
from .serializers import GenerationSerializer


class GenerationListView(generics.ListAPIView):
    serializer_class = GenerationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role != user.Role.ENCARGADO:
            raise PermissionDenied(
                "Solo los encargados pueden consultar las generaciones."
            )

        return (
            Generation.objects
            .prefetch_related(
                "members__collaborator"
            )
            .order_by("-number")
        )