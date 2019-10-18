from rest_framework  import serializers
from .models import Image
from jwt_auth.serializers import UserSerializer

class PopulatedImageSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Image
        fields = ('id', 'name', 'user', 'url', 'position')

class ImageDeserializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = '__all__'


    def create(self, validated_data):
        name_data = validated_data.pop('name')
        url_data = validated_data.pop('url')
        user_data = validated_data.pop('user')
        print(user_data)
        validated_data['user'] = user_data
        validated_data['url'] = url_data
        validated_data['name'] = name_data

        image = Image.objects.create(**validated_data)
        # image.user.set(user_data)
        # image.url.set(url_data)
        # image.name.set(name_data)


        return image
