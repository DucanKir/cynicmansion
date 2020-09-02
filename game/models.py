
from django.db import models
from django.contrib.auth.models import User


class Image(models.Model):
    name = models.CharField(max_length=500, unique=True)
    position = models.IntegerField(default=1)
    user = models.ForeignKey(User, related_name='games', on_delete=models.CASCADE)
    data = models.BinaryField(null=False, max_length=10000000, default=b'')

    def __str__(self):
        return self.name


class Comment(models.Model):
    content = models.TextField()
    user = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.content}'
