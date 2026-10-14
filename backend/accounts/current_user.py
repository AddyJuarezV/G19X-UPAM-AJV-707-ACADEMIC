from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CollaboratorProfile


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        data = {
            "id": user.id,
            "email": user.email,
            "role": user.role,
        }

        if user.role == user.Role.COLABORADOR:
            try:
                profile = user.collaborator_profile
            except CollaboratorProfile.DoesNotExist:
                profile = None

            if profile:
                data["profile"] = {
                    "id": profile.id,
                    "full_name": profile.full_name,
                    "university": profile.university,
                    "university_acronym": profile.university_acronym,
                    "career": profile.career,
                    "required_hours": profile.required_hours,
                    "application_status": profile.application_status,
                    "correction_reason": profile.correction_reason,
                }
            else:
                data["profile"] = None

        return Response(data)