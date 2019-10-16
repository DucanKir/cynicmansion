from rest_framework  import serializers
from .models import Image
from jwt_auth.serializers import UserSerializer

class PopulatedImageSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Image
        fields = ('id', 'name', 'user', 'url')
