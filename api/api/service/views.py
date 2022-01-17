from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.service.serializers import UserSerializer, GroupSerializer

from .models import Schedule

@api_view(['GET', 'POST'])
def schedule(request):
    if Schedule.objects.count() == 0:
        Schedule.objects.create(name='Default schedule')

    if request.method == 'POST':
        Schedule.objects.create(
            name=request.data['name']
        )

    response_body = []
    for current_schedule in Schedule.objects.all():
        response_body.append({'name': current_schedule.name})

    return Response(response_body)

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