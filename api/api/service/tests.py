from django.test import TestCase
from rest_framework.test import APIClient

from .models import Schedule

class ScheduleTestCase(TestCase):
    def setUp(self):
        self.factory = APIClient()

    def test_default_schedule(self):
        actual_response_body = self.factory.get('/schedules/', format='json').data

        self.assertEqual(len(actual_response_body), 1)

        self.assertEqual(actual_response_body, [{'name': 'Default schedule'}])

    def test_add_schedule(self):
        # Make multiple API calls for adding a schedule
        response = self.factory.post('/schedules/', {'name': 'Schedule #2'}, format='json')
        response = self.factory.post('/schedules/', {'name': 'Schedule #3'}, format='json')
        response = self.factory.post('/schedules/', {'name': 'Schedule #4'}, format='json')

        # Check that a schedule was created
        schedules = Schedule.objects.all()
        self.assertEqual(schedules.count(), 4)

        # Check contents of the schedules
        self.assertEqual(schedules[0].name, 'Default schedule')
        self.assertEqual(schedules[1].name, 'Schedule #2')
        self.assertEqual(schedules[2].name, 'Schedule #3')
        self.assertEqual(schedules[3].name, 'Schedule #4')

        # Check contents of the response body
        expected_response_body = [
            {'name': 'Default schedule'},
            {'name': 'Schedule #2'},
            {'name': 'Schedule #3'},
            {'name': 'Schedule #4'}
        ]
        
        self.assertEqual(expected_response_body, response.data)

    def test_get_schedules(self):
        # Make multiple API calls for adding a schedule
        response = self.factory.post('/schedules/', {'name': 'Schedule #2'}, format='json')
        response = self.factory.post('/schedules/', {'name': 'Schedule #3'}, format='json')
        response = self.factory.post('/schedules/', {'name': 'Schedule #4'}, format='json')

        actual_response_body = self.factory.get('/schedules/', format='json').data
        expected_response_body = [
            {'name': 'Default schedule'},
            {'name': 'Schedule #2'},
            {'name': 'Schedule #3'},
            {'name': 'Schedule #4'}
        ]

        self.assertEqual(expected_response_body, actual_response_body)