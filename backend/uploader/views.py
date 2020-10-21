from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from rest_framework.views import Response
from rest_framework.serializers import ValidationError


def image_upload(request):
    if request.method == "POST" and request.FILES["file"]:
        image_file = request.FILES["file"]
        fs = FileSystemStorage()
        filename = fs.save(image_file.name, image_file)
        image_url = fs.url(filename)
        print(image_url)
        return Response({
            'image_url': image_url
        })
    else:
        raise ValidationError({'msg': 'Incorrect request format'})
        