from django.core.files.storage import FileSystemStorage
from rest_framework.views import Response, APIView
from rest_framework.serializers import ValidationError
from rest_framework.viewsets import GenericViewSet
from django.http import Http404
from rest_framework import status

from .serializers import BlockSerializer
from .models import Block


class ImageUploaderViewSet(APIView):
    def post(self, request, block_id=None):
        if request.FILES["file"]:
            image_file = request.FILES["file"]
            fs = FileSystemStorage()
            filename = fs.save(image_file.name, image_file)
            image_url = fs.url(filename)
            
            block = Block.objects.filter(id=block_id).first()
            if not block:
                raise Http404
            block.img_url = image_url
            block.save()
            return Response({
                'image_url': image_url
            })
        else:
            raise ValidationError({'msg': 'Incorrect request format'})


class BlocksInfoViewSet(GenericViewSet):
    def list(self, request, *args, **kwargs):
        queryset = Block.objects.all()
        response_data = []
        for block in queryset:
            serializer_block = BlockSerializer(block)            
            response_data.append(serializer_block.data)        
        return Response(data=response_data, status=status.HTTP_200_OK)

    