from django.db import models
from rest_framework import serializers

class MissingPerson(models.Model):

    name = models.CharField(max_length=200)
    lkl_lat = models.FloatField(null=True)
    lkl_lng = models.FloatField(null=True)

    pictures = models.TextField(blank=True)

    def __str__(self):
        return self.name

class MissingPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = MissingPerson
        fields = '__all__'
