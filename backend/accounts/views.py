from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import CollaboratorRegistrationSerializer


class CollaboratorRegistrationView(generics.CreateAPIView):
    serializer_class = CollaboratorRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        profile = serializer.save()

        return Response(
            {
                "message": "Cuenta creada correctamente.",
                "user": {
                    "email": profile.user.email,
                    "role": profile.user.role,
                },
                "profile": {
                    "id": profile.id,
                    "full_name": profile.full_name,
                    "university_acronym": profile.university_acronym,
                    "application_status": profile.application_status,
                },
            },
            status=status.HTTP_201_CREATED,
        )