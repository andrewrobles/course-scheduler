from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.service.serializers import UserSerializer, GroupSerializer, ScheduleSerializer

from django.shortcuts import get_object_or_404
from .models import Schedule

@api_view(['GET', 'POST'])
def schedule(request):
    if Schedule.objects.count() == 0:
        Schedule.objects.create(name='Default schedule')

    if request.method == 'POST':
        Schedule.objects.create(
            name=request.data['name']
        )

    # Return all schedules in the response
    response_body = get_schedules()

    return Response(response_body)

@api_view(['DELETE'])
def delete_schedule(request, pk):
    # Delete only if more than one schedule exists
    if Schedule.objects.count() > 1 and schedule_exists(pk):
        schedule = get_object_or_404(Schedule, pk=pk)
        schedule.delete()

    # Return all the schedules in the response
    response_body = get_schedules()

    return Response(response_body)

@api_view(['PUT'])
def edit_schedule(request, pk):
    
    if schedule_exists(pk):
        schedule = Schedule.objects.get(pk=pk)
        schedule.name=request.data['name']
        schedule.save()

    # Return all the schedules in the response
    response_body = get_schedules()

    return Response(response_body)

def get_schedules():
    schedules = []
    for current_schedule in Schedule.objects.all():
        schedules.append({
            'name': current_schedule.name,
            'id': current_schedule.id
        })

    return schedules

def schedule_exists(pk):
    return Schedule.objects.filter(pk=pk).exists()


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class ScheduleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows schedules to be viewed or edited.
    """
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.IsAuthenticated]
    