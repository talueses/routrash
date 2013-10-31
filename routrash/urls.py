from django.conf.urls import patterns, include, url
from map import *

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'map.views.inicio', name='home'),
    url(r'^home', 'map.views.inicio', name='home'),
    url(r'^login', 'map.views.ingreso', name='login'),
    url(r'^salir', 'map.views.salir', name='salir'),
	url(r'^register', 'map.views.register', name='register'),



    url(r'^route/(?P<id>\d+)$', 'map.views.points_route'),
    url(r'^routes', 'map.views.points_route_json'),

    # url(r'^routrash/', include('routrash.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    #url(r'^admin/', include(admin.site.urls)),
)
