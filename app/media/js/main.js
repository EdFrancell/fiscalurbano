/*
#######################################################################
#
# Author: Eduardo Francellino
#
#######################################################################
*/

$(function(){

	var lat = geoip_latitude();
	var lon = geoip_longitude();

	var url_end = "?nocache=" + (new Date()).valueOf();

	var marker_count = 1;

	$("#map").gmap3(
	{
		action: 'init', 
		options: { 
			center:[lat,lon], zoom: 11
		},
			events:{
				rightclick:function(map, event){
					current = event;
					$(this).gmap3( { 
						action: 'addMarkers', 
						markers:
						[ 
							{
								lat:current.latLng.lat(), 
								lng:current.latLng.lng(), 
								data:'Ponto : ' + marker_count++  ,
								options:{ suppressInfoWindows: false }
							} 
						],
						marker:{options:{ draggable: true },
						events:{
							mouseover:function(marker, event, data){
								$(this).gmap3({action:'addinfowindow', anchor:marker, options:{content: data}});
							},
							mouseout: function(){
								var infowindow = $(this).gmap3({action:'get', name:'infowindow'});
									if (infowindow){
										infowindow.close();
									}
							}										
						}
						}
					});
				}
			}
		}
	);

	var userMakers = [];


	
		$('#btnVai').click(function(){

			$.getJSON('http://furb.herokuapp.com/relatos/?format=json', function(data) {
				
				$.each(data, function(index) {
					content_str = 'Por: ' + data[index].user;
					content_str += '<br>#' + data[index].incidentTitle.replace(' ', '_');
					content_str += ' ' + data[index].description;

					userMakers[index] = {lat: data[index].latitude, lng: data[index].longitude, data: content_str, tag:"listing"};
				});

			}).done(function() {

				var clear = {action:'clear', name:'marker', tag:'listing'};

				$("#map").gmap3(clear);

				$("#map").gmap3( { 
					action: 'addMarkers', 
					markers: userMakers,
					
					marker:{options:{ draggable: false, animation: google.maps.Animation.DROP },
					
					events:{
						mouseover:function(marker, event, data){
							$(this).gmap3({action:'addinfowindow', anchor:marker, options:{content: data}});
						},
						mouseout: function(){
							var infowindow = $(this).gmap3({action:'get', name:'infowindow'});
							if (infowindow){
								infowindow.close();
							}
						}										
					}
					}
				});


			});

		});

		$('#btnVai').trigger('click');

});
