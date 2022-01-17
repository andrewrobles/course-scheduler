from django.test import TestCase
from rest_framework.test import APIClient

from .models import Schedule

class ScheduleTestCase(TestCase):
    def setUp(self):
        self.factory = APIClient()

        # Get request creates default schedule object
        self.factory.get('/schedules/', format='json').data


    def test_get_schedules(self):
        actual = self.factory.get('/schedules/', format='json').data
        expected = [
            {'name': 'Default schedule'},
        ]

        self.assertEqual(actual, expected)

    def test_add_schedule(self):
        actual = self.factory.post('/schedules/', {'name': 'Schedule #2'}, format='json').data
        expected = [
            {'name': 'Default schedule'},
            {'name': 'Schedule #2'}
        ]

        self.assertEqual(actual, expected)

    def test_delete_schedule(self):
        actual = self.factory.delete('/schedules/1/delete/', format='json').data
        expected = []
        
        self.assertEqual(actual, expected)