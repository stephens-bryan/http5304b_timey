from django import forms
from timey.models import Note


class NoteForm(forms.ModelForm):
    note = forms.CharField(label='Enter Note:', max_length=256, )
    time = forms.CharField(widget=forms.HiddenInput())

    # An inline class to provide additional information on the form
    class Meta:
        # Provide an association between the ModelForm and a model
        model = Note
        fields = ('note', 'time')
        labels = {
            'note': 'Note:',
        }
