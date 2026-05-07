import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'diyora_project.settings')
django.setup()

from store.models import Book

with open('data.json', 'r', encoding='utf-8') as f:
    books = json.load(f)

for b in books:
    Book.objects.get_or_create(
        id=b['id'],
        defaults={
            'title': b['title'],
            'author': b['author'],
            'price': b['price'],
            'category': b['category'],
            'emoji': b['emoji']
        }
    )

print("Ma'lumotlar bazaga yuklandi")
