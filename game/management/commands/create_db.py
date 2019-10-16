from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from game.models import Image
from game.serializers import PopulatedImageSerializer, ImageDeserializer
import boto3

class Command(BaseCommand):
    help = 'HELP'

    def handle(self, *_args, **_options):

        admin_user = User.objects.get(username='admin')

        s3_client = boto3.client('s3')
        s3_resource = boto3.resource('s3')

        bucket_name = 'cynic.game.images'
        my_bucket = s3_resource.Bucket(bucket_name)

        for image in my_bucket.objects.all():

            params = {'Bucket': 'cynic.game.images', 'Key': image.key}
            url = s3_client.generate_presigned_url('get_object', params)
            name = image.key
            image_details = {}
            image_details['user'] = admin_user.pk
            image_details['url'] = url
            image_details['name'] = name[:-4]
            print()

            image_serializer = ImageDeserializer(data=image_details)
            image_serializer.is_valid(raise_exception=True)
            image = image_serializer.save()
