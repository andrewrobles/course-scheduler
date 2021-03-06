from django.urls import include, path
from rest_framework import routers
from api.service import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('schedules/', views.schedule, name='schedules'),
    path('schedules/<int:pk>/delete/', views.delete_schedule, name='delete-schedule'),
    path('schedules/<int:pk>/edit/', views.edit_schedule, name='edit-schedule'),
    path('helloworld/', views.helloworld, name='helloworld')
]