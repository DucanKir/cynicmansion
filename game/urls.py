from django.urls import path
from .views import ImagesList, ImageDetail
urlpatterns = [
    path('images/', ImagesList.as_view()),
    path('images/<pk>/', ImageDetail.as_view()),
]
