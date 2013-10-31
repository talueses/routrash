	function getLocation(position)
	{
		$ROUTRASH.MAPS.init(position.coords.latitude,position.coords.longitude);
	}
	function currentLocation()
	{
		if(navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(getLocation);
		}
		else
		{
			$ROUTRASH.MAPS.init(10.491016,-66.902061);
		}
	}
$(document).on('ready',function(){
	//Ubicacion en mapa
	currentLocation();
	$ROUTRASH.MAPS.showRoutes();
});
