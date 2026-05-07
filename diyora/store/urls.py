from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('katalog/', views.katalog, name='katalog'),
    path('onlayn-kitoblar/', views.onlayn_kitoblar, name='onlayn_kitoblar'),
    path('buyurtma/', views.buyurtma, name='buyurtma'),
    path('biz-haqimizda/', views.biz_haqimizda, name='biz_haqimizda'),
    path('aloqa/', views.aloqa, name='aloqa'),
    path('api/books/', views.api_books, name='api_books'),
    path('api/books/<int:book_id>/', views.api_book, name='api_book'),
]
