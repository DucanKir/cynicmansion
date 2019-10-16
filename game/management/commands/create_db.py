from django.core.management.base import BaseCommand, CommandError
import requests
import boto3
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'HELP'

    def handle(self, *_args, **_options):
        
        admin_user = User.objects.get(username='admin')

        s3_client = boto3.client('s3')
        s3_resource = boto3.resource('s3')

        bucket_name = 'cynic.game.images'
        my_bucket = s3_resource.Bucket(bucket_name)

        for file in my_bucket.objects.all():
            params = {'Bucket': 'cynic.game.images', 'Key': file.key}
            url = s3_client.generate_presigned_url('get_object', params)
            print(file.key)
            print(url)
