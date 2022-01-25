from django.test import TestCase
from rest_framework.test import APIClient

from .models import Schedule

class HelloWorldTestCase(TestCase):
    def setUp(self):
        self.factory = APIClient()

    def test_get_hello_world(self):
        actual = self.factory.get('/helloworld/', format='json').data
        expected = {'message': 'Hello World!'}

        self.assertEqual(actual, expected)

class ScheduleTestCase(TestCase):
    def setUp(self):
        self.factory = APIClient()

        # Get request creates default schedule object
        self.factory.get('/schedules/', format='json').data

    def test_get_schedules(self):
        actual = self.factory.get('/schedules/', format='json').data
        expected = [{'name': 'Default schedule', 'id': 1}]

        self.assertEqual(actual, expected)

    def test_add_schedule(self):
        actual = self.factory.post('/schedules/', {'name': 'Schedule #2'}, format='json').data
        expected = [{'name': 'Default schedule', 'id': 1}, {'name': 'Schedule #2', 'id': 2}]

        self.assertEqual(actual, expected)

    def test_delete_schedule(self):
        # create a new schedule
        self.factory.post('/schedules/', {'name': 'Schedule #2'}, format='json')
        
        # Attempt to delete the default schedule should be successful
        actual = self.factory.delete('/schedules/1/delete/', format='json').data
        expected = [{'name': 'Schedule #2', 'id': 2}]
        
        self.assertEqual(actual, expected)

    def test_delete_non_existent_schedule(self):
        # create a new schedule
        self.factory.post('/schedules/', {'name': 'Schedule #2'}, format='json')
        
        # Attempt to delete the default schedule should be successful
        actual = self.factory.delete('/schedules/3/delete/', format='json').data
        expected = [{'name': 'Default schedule', 'id': 1}, {'name': 'Schedule #2', 'id': 2}]
        
        self.assertEqual(actual, expected)

    def test_edit_schedule(self):
        # Attempt to rename the default schedule
        actual = self.factory.put('/schedules/1/edit/', {'name': 'My schedule'}, format='json').data
        expected = [{'name': 'My schedule', 'id': 1}]

        self.assertEqual(actual, expected)

    def test_edit_non_existing_schedule(self):
        # Attempt to rename the default schedule
        actual = self.factory.put('/schedules/2/edit/', {'name': 'My schedule'}, format='json').data
        expected = [{'name': 'Default schedule', 'id': 1}]

        self.assertEqual(actual, expected)

    def test_prevent_last_schedule_deletion(self):
        # Attempt to delete the newly created schedule should be unsuccessful
        actual = self.factory.delete('/schedules/1/delete/', format='json').data
        expected = [{'name': 'Default schedule', 'id': 1}]
        
        self.assertEqual(actual, expected)
