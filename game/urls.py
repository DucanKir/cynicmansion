from django.urls import path
from .views import ImagesList, ImageDetail, CommentsList, CommentDetailView
urlpatterns = [
    path('images/', ImagesList.as_view()),
    path('images/<name>', ImageDetail.as_view()),
    path('comments/', CommentsList.as_view()),
    path('comments/<pk>/', CommentDetailView.as_view()),
]
