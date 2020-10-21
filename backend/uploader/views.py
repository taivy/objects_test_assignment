import json

from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from rest_framework.views import Response
from rest_framework.serializers import ValidationError
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.decorators import api_view, renderer_classes


@csrf_exempt
@api_view(('POST',))
def image_upload(request):
    print(request)
    print(request.FILES)
    print(request.POST)
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

