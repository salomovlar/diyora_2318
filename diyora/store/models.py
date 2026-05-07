from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    price = models.IntegerField()
    category = models.CharField(max_length=50)
    emoji = models.CharField(max_length=10)

    def __str__(self):
        return self.title
