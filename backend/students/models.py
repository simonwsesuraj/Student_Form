from django.db import models
from datetime import date

class Student(models.Model):
    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other"),
    ]

    DEPARTMENTS = [
        ("Computer Science", "Computer Science"),
        ("Information Technology", "Information Technology"),
        ( "Data Science", "Data Science"),
        ("Artificial Intelligence", "Artificial Intelligence"),
        ("Botany", "Botany"),
        ("Chemistry", "Chemistry"),
        ("Physics", "Physics"),
    ]

    name = models.CharField(max_length=200)
    dnumber = models.CharField(max_length=50, unique=True)   # unique Dnumber
    department = models.CharField(max_length=50, choices=DEPARTMENTS)
    phone = models.CharField(max_length=20, unique=True)     # unique phone
    email = models.EmailField(unique=True)                   # unique email
    address = models.TextField(blank=True)
    mark_10 = models.FloatField()
    percentage_10 = models.FloatField(null=True, blank=True, editable=False)  # auto
    mark_12 = models.FloatField()
    percentage_12 = models.FloatField(null=True, blank=True, editable=False)  # auto
    dob = models.DateField()
    age = models.IntegerField(null=True, blank=True, editable=False)  # auto
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES)
    ug_cgpa = models.FloatField()
    ug_passed_out = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Auto calculate 10th percentage (assuming total 500)
        if self.mark_10:
            self.percentage_10 = (self.mark_10 / 500) * 100

        # Auto calculate 12th percentage (assuming total 600)
        if self.mark_12:
            self.percentage_12 = (self.mark_12 / 600) * 100

        # Auto calculate age from DOB
        if self.dob:
            today = date.today()
            self.age = today.year - self.dob.year - (
                (today.month, today.day) < (self.dob.month, self.dob.day)
            )

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.dnumber})"
