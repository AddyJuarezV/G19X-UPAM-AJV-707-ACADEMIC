from django.db import transaction
from rest_framework import serializers

from .models import CollaboratorProfile, User


class CollaboratorRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    full_name = serializers.CharField(max_length=200)
    curp = serializers.CharField(max_length=18)
    phone = serializers.CharField(max_length=20)
    institutional_email = serializers.EmailField()
    university = serializers.CharField(max_length=200)
    university_acronym = serializers.CharField(max_length=20)
    career = serializers.CharField(max_length=200)
    required_hours = serializers.IntegerField(min_value=1)

    cv = serializers.FileField()
    university_id = serializers.FileField()

    def validate_email(self, value):
        email = value.strip().lower()

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                "Ya existe una cuenta con este correo electrónico."
            )

        return email

    def validate_curp(self, value):
        curp = value.strip().upper()

        if len(curp) != 18:
            raise serializers.ValidationError(
                "La CURP debe contener 18 caracteres."
            )

        if CollaboratorProfile.objects.filter(curp=curp).exists():
            raise serializers.ValidationError(
                "Ya existe un colaborador registrado con esta CURP."
            )

        return curp

    @transaction.atomic
    def create(self, validated_data):
        email = validated_data.pop("email")
        password = validated_data.pop("password")

        user = User.objects.create_user(
            email=email,
            password=password,
            role=User.Role.COLABORADOR,
        )

        profile = CollaboratorProfile.objects.create(
            user=user,
            application_status=CollaboratorProfile.ApplicationStatus.DRAFT,
            **validated_data,
        )

        return profile