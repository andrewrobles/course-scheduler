from django.test import TestCase
from rest_framework.test import APIClient

from .models import Schedule

class ScheduleTestCase(TestCase):
    def setUp(self):
        self.factory = APIClient()

    def test_add_schedule(self):
        request_body = {
            'name': 'Default schedule'
        }

        # Make API call for adding a schedule
        response = self.factory.post('/schedules/', request_body, format='json')

        # Check that a schedule was created
        schedule_count = Schedule.objects.all().count()
        self.assertEqual(schedule_count, 1)

        # Check contents of the schedule
        schedule = Schedule.objects.first()
        self.assertEqual(schedule.name, request_body['name'])