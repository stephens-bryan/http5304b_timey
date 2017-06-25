# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


# Create your models here.

class UserType(models.Model):
    user_type = models.CharField('user type', max_length=256)

    def __str__(self):
        return self.user_type


class Note(models.Model):
    note = models.CharField(max_length=256)
    time = models.CharField(max_length=256)

    def __str__(self):
        return self.note


class User(models.Model):
    first_name = models.CharField('first name', max_length=256)
    last_name = models.CharField('last name', max_length=256)
    email = models.EmailField(max_length=256)
    user_type = models.ForeignKey(UserType, on_delete=models.CASCADE)


class Category(models.Model):
    name = models.CharField(max_length=300)
    note = models.ForeignKey(Note, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
