from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    url(r'^get_Quizlet/$', views.get_Quizlet, name='get_Quizlet'),
]