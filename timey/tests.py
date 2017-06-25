# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from .models import *


# Create your tests here.
class NoteModelTests(TestCase):
    def test_can_add_a_note(self):
        """
        :return: False if unable to make a note
        """
        note = Note(note='Sample Note', time='2017-06-20 03:33')

        self.assertIs(note, False)
