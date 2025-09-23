from rest_framework import serializers
from .models import Student
from datetime import date

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"

    # Auto-calculate percentage and age
    def validate(self, data):
        # 10th percentage
        if data.get("mark_10"):
            data["percentage_10"] = (data["mark_10"] / 500) * 100  # assuming 500 total

        # 12th percentage
        if data.get("mark_12"):
            data["percentage_12"] = (data["mark_12"] / 600) * 100  # assuming 600 total

        # Age from DOB
        if data.get("dob"):
            today = date.today()
            age = today.year - data["dob"].year - (
                (today.month, today.day) < (data["dob"].month, data["dob"].day)
            )
            data["age"] = age

        return data
