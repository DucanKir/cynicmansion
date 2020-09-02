import json
import boto3
from game.models import Image
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from game.models import Image
from game.serializers import PopulatedImageSerializer, ImageDeserializer
import boto3

class Command(BaseCommand):
    help = 'HELP'

    def handle(self, *_args, **_options):
        Image.objects.all().delete()

        with open(Path(__file__).parents[2] / 'fixtures.json') as f:
            data = json.load(f)
    
        s3 = boto3.client('s3')
        bucket_name = data['bucket']
        items = data['data']

        for i, item in enumerate(items):
            print(f'Downloading {i+1}/{len(items)}: {item["fields"]["s3_object_name"]}')
            response = s3.get_object(Bucket=bucket_name, Key=item['fields']['s3_object_name'])
            bin_data = response['Body'].read()

            image_obj = Image(
                name=item['fields']['s3_object_name'][:-4],
                position=item['fields']['position'],
                user_id=item['fields']['user'],
                data=bin_data,
            )
            image_obj.save()

        # with open('game/fixtures.json', 'w') as f:
        #     f.write(json.dumps(data, indent=2))