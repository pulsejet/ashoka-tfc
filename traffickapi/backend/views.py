from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from backend.models import MissingPerson, MissingPersonSerializer

@api_view(['GET', 'POST', ])
def test_api(request):
    return Response({
        "go": "text",
        "num": 2093,
    })

@api_view(['POST', ])
def missing_person_upload(request):
    serializer = MissingPersonSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET', ])
def missing_person_list(request):
    people = MissingPerson.objects.all()
    people = MissingPersonSerializer(people, many=True)
    return Response(people.data)
