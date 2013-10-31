from django.db import models


#encoding:utf-8
# Create your models here.

class routes(models.Model):
	name = models.TextField(help_text='Routes Name')
	day = models.TextField(help_text='Day routes')

	def __unicode__(self):
		return self.name

class points(models.Model):
	routes = models.ForeignKey(routes)
	lat = models.CharField(max_length=50, help_text='Latitude')
	lon = models.CharField(max_length=50, help_text='Longitude')
	def __unicode__(self):
		return self.id




