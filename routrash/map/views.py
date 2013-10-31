# Create your views here.
# -*- coding: utf-8 -*- 
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.template import RequestContext
from django.utils.html import *
from django.core import serializers
from map.models import *
from map.forms import *
import json


def inicio(request):
	title = 'RouTrash'
	print request.method
	return render_to_response('base.html',locals(), context_instance=RequestContext(request))

def register (request):
	title = 'registro de usuario'
	formulario = registro()
	return render_to_response('registro.html',locals(),context_instance=RequestContext(request))




def save_points_routes(request):
	if request.is_ajax():
		if request.method == 'POST':
			print request.raw_post_data

			## save_point = points.objects.create(route=id,lon=data1,lat=data2)
	return HttpResponse('OK')		


def points_route(request, id):
	route_selected = routes.objects.get(pk=id)
	points_receive = points.objects.filter(routes=id)
	data = serializers.serialize('json', points_receive)
	return HttpResponse(data, mimetype='application/json')

def points_route_json(request):
	puntos = {}		
	rutas = {}
	posicion=0
	routes_all= routes.objects.all()
	for route in routes_all:
		points_allone = points.objects.filter(routes_id= route.id)

		for point in points_allone:

			puntos[point.id] = {'longitud':point.lon,'latitude':point.lat}

		rutas[posicion]=puntos
		posicion+=1
 
	return HttpResponse(json.dumps(rutas), content_type="application/json")

		



##  User's manager

def ingreso(request):
	if request.method == 'POST':
		user = authenticate(username=request.POST.get('user'),password=request.POST.get('clave'))
		if user is not None:
			if user.is_active:
				login(request,user)
				return HttpResponseRedirect('/')
			else:
				estado = 1 # Error no Activo
		else:
		 estado = 3 # Usuario no Existe		
							
		
	if estado:
		if estado == 1:
			error = 'Este usuario no esta activo si cree que es un error contacte con el administrador.'
		elif estado == 2: 
			error = 'Todos los campos son Obligatorios.'
		elif estado == 3:
			error = 'Usuario o Contraseña Invalida.'			
		
		context = {'title':'RouTrash','error':error}
		return render_to_response('base.html',context,context_instance=RequestContext(request))

def salir(request):
	logout(request)
	return HttpResponseRedirect('../../../../')		