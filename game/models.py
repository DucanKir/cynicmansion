
from django.db import models
from django.contrib.auth.models import User

class Image(models.Model):
    name = models.CharField(max_length=500)
    url = models.CharField(max_length=5000, blank=True)
    position = models.IntegerField(default=1)
    user = models.ForeignKey(User, related_name='games', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
