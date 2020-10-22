from django.db import models


class Block(models.Model):
    img_url = models.CharField(max_length=256, blank=True, null=True)
    text = models.TextField(blank=True, null=True)
    creation_date = models.DateTimeField(auto_now_add=True)
