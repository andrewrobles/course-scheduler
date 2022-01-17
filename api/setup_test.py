import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

from api.service.models import Schedule

# Remove all schedules in the database
for schedule in Schedule.objects.all():
    schedule.delete()

# # Add schedules to the database
# for current_name in ['Default schedule', 'Schedule #2', 'Schedule #3']:
#     Schedule.objects.create(name=current_name)