from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework.serializers import CharField, ModelSerializer, SerializerMethodField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["full_name"] = f"{user.first_name} {user.last_name}"
        token["email"] = user.email
        token["profile_photo"] = user.profile_photo.url
        token["is_superuser"] = user.profile_photo.url
        token["is_staff"] = user.profile_photo.url

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserSerializer(ModelSerializer):
    password = CharField(write_only=True)
    full_name = SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "full_name",
            "email",
            "profile_photo",
            "is_superuser",
            "is_staff",
            "password",
        ]

    def get_full_name(self, instance):
        return f"{instance.first_name} {instance.last_name}"

    def create(self, validated_data):
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if "password" in validated_data:
            instance.password = make_password(validated_data.pop("password"))
        return super().update(instance, validated_data)
