from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core import serializers
from .models import Book

def index(request):
    books = Book.objects.all()[:4]
    author_count = Book.objects.values('author').distinct().count()
    category_count = Book.objects.values('category').distinct().count()
    return render(request, 'index.html', {'books': books, 'author_count': author_count, 'category_count': category_count})

def katalog(request):
    books = Book.objects.all()
    return render(request, 'katalog.html', {'books': books})

def onlayn_kitoblar(request):
    books = Book.objects.all()
    return render(request, 'onlayn-kitoblar.html', {'books': books})

def buyurtma(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        address = request.POST.get('address')
        return redirect('index')
    return render(request, 'buyurtma.html')

def biz_haqimizda(request):
    return render(request, 'biz-haqimizda.html')

def aloqa(request):
    return render(request, 'aloqa.html')

def api_books(request):
    books = Book.objects.all().values()
    return JsonResponse(list(books), safe=False)

def api_book(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        return JsonResponse({
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'price': book.price,
            'category': book.category,
            'emoji': book.emoji
        })
    except Book.DoesNotExist:
        return JsonResponse({'error': 'Book not found'}, status=404)
