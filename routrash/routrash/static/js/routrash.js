/**
 * Objeto global
 */
$ROUTRASH={};

/**
 *
 */
$ROUTRASH.UI=(function()
{
	/**
	 *
	 */
	function _newRoute()
	{
		$ROUTRASH.MAPS.listen();		
	}

	function _actionsEdit()
	{
		$('button#borrar').on('click',function()
		{
			$ROUTRASH.MAPS.revert();		
		});
	}

	/**
	 *
	 */
	function showMenu()
	{
		$('.crear').on('click',function(e)
		{
			e.preventDefault();
			if(document.getElementById('map-canvas').style.width=='100%' || document.getElementById('map-canvas').style.width=='')
			{
				$('.side').append('<div> <p>A partir de ahora puede marcar punto a punto la ruta</p><br/> <input class="form-control"type="text" name="nombre" placeholder="Nombre"><br/><textarea class="form-control" placeholder="Descripcion"></textarea><br/><input id="guardar" type="submit" class="btn btn-success btn-lg" value="Guardar"/><br/><br/><input id="borrar" type="submit" class="btn btn-danger btn-lg" value="Eliminar"/></div>');
				$('#map-canvas').css({'float':'right','width':'80%'});
				_newRoute();
				_actionsEdit();
			}
			else
			{
				$('#map-canvas').css({'float':'','width':'100%'});
				$('.side').children('div').remove();
			}
		});
		//_showElement(capa=_createElement('div','editar','side','sideMenu'),'');
	}

	function _createElement(element,id,name,className)
	{
		if (element!=undefined)
		{
			newElement=document.createElement(element);
			if (id!=undefined) newElement.id=id;
			if (name!=undefined) newElement.name=name;
			if (className!=undefined) newElement.className=className;
			return newElement;
		}
		else
		{
			return false;
		}
	}

	function _showElement(object,spot)
	{
		$element=$(object).css('display','none');
		$(spot).append($element);
		$element.fadeIn('slow');
		$element=null;
	}

	return{
		showMenu:showMenu,
	}
})();

/**
 * Submodulo de maps
 */
$ROUTRASH.MAPS=(function()
{
	/***/
	var linea=null;
	var ruta=Array(), rutas=Array(), pintadas=Array();
	/*var rutas=[
	[{
		latitude:10.490586413467463,
		longitude:-66.86280369758606
	},{
		latitude: 10.490713007463125,
		longitude: -66.86226725578308
	},{
		latitude: 10.490829051913654,
		longitude: -66.86163425445557
	},{
		latitude: 10.490913447850348,
		longitude: -66.8608295917511
	}],
[{
	latitude: 10.491208833447473,
	longitude: -66.86023950576782
},
{
	latitude: 10.490955645810057,
	longitude: -66.85863018035889
},
{
	latitude: 10.490807952925893,
	longitude: -66.85737490653992
},
{
	ltitude: 10.490554764960446,
	longitude: -66.85554027557373
}],
[{
	latitude: 10.49031212629916,
	longitude: -66.85414552688599
},
{
	latitude: 10.490248829225804,
	longitude: -66.85289025306702
},
{
	latitude: 10.49010113600426,
	longitude: -66.85134530067444
}]];*/


	/**
	 * Marcado de ruta
	 */
	function listen()
	{
		google.maps.event.addListener(map, 'click', function(event) {
    		_placeMarker(event.latLng);
    		_updateLine(ruta);
  		});
	}

	function _updateLine(ruta)
	{
		linea = new google.maps.Polyline({
        		path: ruta,
         		map: map,
         		strokeColor: '#222000',
         		strokeWeight: 4,
         		strokeOpacity: 0.6,
         		clickable: false
    		});
	}

	function revert()
	{
		ruta.splice(ruta.length-1,1);
		_updateLine(ruta);
	}
	/**
	 *
	 */
	function _placeMarker(location)
	{
 		pos=ruta.length;
  		ruta[pos]=location;
	}

	/**
	 *
	 */
	function showRoutes()
	{
		$ROUTRASH.AJAX.getRoutes();
		console.dir($ROUTRASH.MAPS.rutas);
		for (var i in rutas)
		{
			una=rutas[i];
			console.log(rutas);
			for (var key in una)
			{
				una[key]=new google.maps.LatLng(una[key].latitude,una[key].longitude);
			}
			pintadas[i]=new google.maps.Polyline({
        		path: una,
         		map: map,
         		strokeColor: '#222000',
         		strokeWeight: 4,
         		strokeOpacity: 0.6,
         		clickable: false
			});
		}
	}

	/**
	 *
	 */
	function init(latitude,longitude)
	{
		var mapOptions={
		center: new google.maps.LatLng(latitude,longitude),
		zoom: 17,
		mapTypeId: google.maps.MapTypeId.ROADMAPS
		};
		map=new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		//_showRoutes();
		$ROUTRASH.UI.showMenu();
		//_listen();
	}

	return{
		init:init,
		rutas:rutas,
		listen:listen,
		revert:revert,
		showRoutes:showRoutes
	};
})();

/**
 * Submodulo de AJAX
 */
$ROUTRASH.AJAX=(function()
{
	function getRoutes()
	{
		var rutas;
		$.ajax({
			url: "/routes",
			success:function(data)
			{
				$ROUTRASH.MAPS.rutas=data;
			}
		});
	}

	return{
		getRoutes:getRoutes
	}
})();
