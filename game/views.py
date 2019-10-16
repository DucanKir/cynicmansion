from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.http import Http404
from .permissions import IsOwnerOrReadOnly

from .serializers import PopulatedImageSerializer
from .models import Image


class ImagesList(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        images = Image.objects.all()
        serializer = PopulatedImageSerializer(images, many=True)
        return Response(serializer.data)

class ImageDetail(APIView):


    permission_classes = (IsOwnerOrReadOnly,)

    def get_image(self, pk):
        try:
            image = Image.objects.get(pk=pk)
        except Image.DoesNotExist:
            raise Http404

        return image

    def get(self, _request, pk):
        image = self.get_image(pk)
        serializer = PopulatedImageSerializer(image)
        return Response(serializer.data)

    def put(self, request, pk):
        image = self.get_image(pk)
        serializer = PopulatedImageSerializer(image, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

    def delete(self, _request, pk):
        image = self.get_image(pk)
        image.delete()
        return Response(status=204)
