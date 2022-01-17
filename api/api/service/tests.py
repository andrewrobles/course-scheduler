from django.test import TestCase
from rest_framework.test import APIClient

from .models import Schedule

class ScheduleTestCase(TestCase):
    def setUp(self):
        self.factory = APIClient()

        # Get request creates default schedule object
        self.factory.get('/schedules/', format='json').data

        self.expected = [{'name': 'Default schedule', 'id': 1}]


    def test_get_schedules(self):
        actual = self.factory.get('/schedules/', format='json').data
        expected = self.expected

        self.assertEqual(actual, expected)

    def test_add_schedule(self):
        actual = self.factory.post('/schedules/', {'name': 'Schedule #2'}, format='json').data
        expected = self.expected + [{'name': 'Schedule #2', 'id': 2}]


        self.assertEqual(actual, expected)

    def test_delete_schedule(self):
        # create a new schedule
        self.factory.post('/schedules/', {'name': 'Schedule #2'}, format='json').data
        
        # Attempt to delete the default schedule should be successful
        actual = self.factory.delete('/schedules/1/delete/', format='json').data
        expected = [{'name': 'Schedule #2', 'id': 2}]
        
        self.assertEqual(actual, expected)

    def test_prevent_last_schedule_deletion(self):
        # Attempt to delete the newly created schedule should be unsuccessful
        actual = self.factory.delete('/schedules/1/delete/', format='json').data
        expected = self.expected
        
        self.assertEqual(actual, expected)
