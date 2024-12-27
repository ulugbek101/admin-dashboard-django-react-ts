from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import (
    AdminManager,
    ParentManager,
    StudentManager,
    TeacherManager,
    UserManager,
)


class User(AbstractUser):
    """
    Custom user model extending Django's AbstractUser.

    Fields:
        - username (CharField): Optional username field retained for compatibility. Not used for authentication.
        - email (EmailField): Primary field for authentication, must be unique.
        - first_name (CharField): User's first name.
        - last_name (CharField): User's last name.
        - profile_photo (ImageField): Optional profile photo for the user. Defaults to "media/users/user-default.png".
        - role (CharField): User role selected from predefined choices.

    Meta:
        - constraints: Ensures that the combination of first_name and last_name is unique.

    Additional Attributes:
        - USERNAME_FIELD (str): Specifies 'email' as the field used for authentication.
        - REQUIRED_FIELDS (list): Specifies fields required when creating a superuser (first_name, last_name).

    Methods:
        - __str__: Returns the user's full name if available, otherwise the email.
        - save: Hashes the password before saving if it is in plain text.
    """

    ROLE_CHOICES = [
        ("SUPERUSER", "Superuser"),
        ("ADMIN", "Admin"),
        ("TEACHER", "Teacher"),
        ("PARENT", "Parent"),
        ("STUDENT", "Student"),
    ]

    username = models.CharField(max_length=100, blank=True)
    email = models.EmailField(max_length=100, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    profile_photo = models.ImageField(
        default="users/user-default.png", upload_to="users/", blank=True
    )
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="STUDENT",
    )

    objects = UserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["first_name", "last_name"], name="unique_full_name"
            )
        ]

    def __str__(self) -> str:
        return (
            f"{self.first_name} {self.last_name}"
            if self.first_name and self.last_name
            else self.email
        )

    # =========================
    # Role-based Properties
    # =========================
    @property
    def is_admin(self):
        return self.role == "ADMIN"

    @property
    def is_superadmin(self):
        return self.role == "SUPERUSER"

    @property
    def is_teacher(self):
        return self.role == "TEACHER"

    @property
    def is_parent(self):
        return self.role == "PARENT"

    @property
    def is_student(self):
        return self.role == "STUDENT"

    # =========================
    # Hash Password Before Save
    # =========================
    def save(self, *args, **kwargs):
        """
        Overrides the save method to hash the password if it is not already hashed.
        """
        if self.pk:  # Only hash if updating or creating the user
            original = User.objects.get(pk=self.pk)
            self.username = self.email.split("@")[0]
            if self.password != original.password:
                self.password = make_password(self.password)
        else:
            self.password = make_password(self.password)
            self.username = self.email.split("@")[0]

        super().save(*args, **kwargs)


class Teacher(User):
    """
    Proxy model representing users with the TEACHER role.

    Inherits from the base User model but does not create a new database table.
    """

    objects = TeacherManager()

    class Meta:
        proxy = True
        verbose_name = "Teacher"
        verbose_name_plural = "Teachers"


class Student(User):
    """
    Proxy model representing users with the STUDENT role.

    Allows querying and managing students separately from the base User model.
    """

    objects = StudentManager()

    class Meta:
        proxy = True
        verbose_name = "Student"
        verbose_name_plural = "Students"


class Parent(User):
    """
    Proxy model representing users with the PARENT role.

    Useful for managing and querying parent users without affecting the main User model.
    """

    objects = ParentManager()

    class Meta:
        proxy = True
        verbose_name = "Parent"
        verbose_name_plural = "Parents"


class Admin(User):
    """
    Proxy model representing users with the ADMIN role.

    Provides a way to filter and manage admin users separately.
    """

    objects = AdminManager()

    class Meta:
        proxy = True
        verbose_name = "Admin"
        verbose_name_plural = "Admins"
