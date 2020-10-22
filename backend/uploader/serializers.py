from rest_framework import serializers

from . import models


class BlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Block
        fields = ('id', 'img_url', 'text')
