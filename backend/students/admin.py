from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = (
        "name", "dnumber", "department", "phone", "email","mark_10",
        "percentage_10","mark_12", "percentage_12", "age", "gender","ug_cgpa","ug_passed_out",
    )
    search_fields = (
        "dnumber", "phone", "email",
        "percentage_10", "percentage_12", "age","ug_cgpa","ug_passedout",
    )

    readonly_fields = ("percentage_10", "percentage_12", "age",)

    
    list_filter = ("dnumber", "phone", "email","department", "gender", "ug_passed_out", "created_at",)

    ordering = ("-created_at",)