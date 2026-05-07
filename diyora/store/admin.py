from django.contrib import admin
from .models import Book

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'price', 'category', 'emoji')
    list_filter = ('category',)
    search_fields = ('title', 'author')
    ordering = ('id',)
