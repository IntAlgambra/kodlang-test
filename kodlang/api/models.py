from django.db import models
from django.utils import timezone

# Create your models here.
class Article(models.Model):
    time_posted = models.DateTimeField(default = timezone.now)
    title = models.CharField(max_length=120)
    body = models.TextField()
    image = models.ImageField(default='default.svg', upload_to='articles_images')

    def __str__(self):
        return(self.title)