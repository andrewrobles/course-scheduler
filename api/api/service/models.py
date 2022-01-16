from django.db import models

# Create your models here.
class Schedule(models.Model):
    name = models.CharField(max_length=30)