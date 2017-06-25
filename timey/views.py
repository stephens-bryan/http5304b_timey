# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from timey.models import *
from timey.forms import NoteForm
from django.http import JsonResponse
from django.core import serializers


# Create your views here.
def index(request):
    return render(request, 'index.html')


def make_note(request):
    if request.method == 'POST':
        form = NoteForm(request.POST)
        if form.is_valid():
            form.save(commit=True)
            return index(request)
        else:
            print(form.errors)
    else:
        form = NoteForm()
    return render(request, 'add_note.html', {'form': form})


def view_notes(request):
    if request.method == 'GET':
        data = Note.objects.all()
        data_serialized = serializers.serialize('json', data)
        return JsonResponse(data_serialized, safe=False)
