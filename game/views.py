from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.http import Http404
from .permissions import IsOwnerOrReadOnly

from .serializers import PopulatedImageSerializer, PopulatedCommentSerializer
from .models import Image, Comment


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

class CommentsList(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        comment = Comment.objects.all()
        serializer = PopulatedCommentSerializer(comment, many=True)
        return Response(serializer.data)

class CommentDetailView(APIView):

    permission_classes = (IsOwnerOrReadOnly,)

    def get(self, _request, pk):
        comment = Comment.objects.get(pk=pk)
        serializer = PopulatedCommentSerializer(comment)
        return Response(serializer.data)

    def put(self, request, pk):
        comment = Comment.objects.get(pk=pk)
        serializer = PopulatedCommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=422)



    def delete(self, _request, pk):
        comment = Comment.objects.get(pk=pk)
        comment.delete()

        return Response(status=204)
