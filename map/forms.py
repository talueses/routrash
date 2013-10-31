# Formularios web.
# -*- coding: utf-8 -*- 
from django.forms import *
from django import forms
from map.models import *
from django.contrib.admin import widgets
from django.contrib.auth.models import User



class registro(ModelForm):
	class Meta:
		model = User
		fields = ['username','first_name','last_name','email']
		widgets ={
			'username' : forms.TextInput(attrs={'class':'form-control','placeholder':'Usuario'}),
			'first_name' : forms.TextInput(attrs={'class':'form-control','placeholder': 'Nombre'}),
			'last_name' : forms.TextInput(attrs={'class':'form-control','placeholder':'Apellido'}),
			'email' : forms.TextInput(attrs={'class':'form-control', 'placeholder':'Correo Electronico'}),
			
		}