from django.conf.urls import url

from . import views

urlpatterns = [
    # /
    url(r'^$', views.index, name='index'),
    # /add_note
    url(r'make_note/$', views.make_note, name='make_note'),
    # /add_note ==> view notes
    url(r'view_notes/$', views.view_notes, name='view_note'),
]
