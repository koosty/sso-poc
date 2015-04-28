$(document).ready(function() {
	
	  if($('#map-multiple-marker').length){
	        $('#map-multiple-marker').gmap3({
	            map:{
	                options:{
	                    center:[-2.548926,118.0148634],
	                    zoom: 5
	                }
	            },
	            circle:{
	                values: [
	                  { // Jakarta
	                    options : {
	                      center:[-6.2297465,106.829518],
	                      radius : 75000,
	                      fillColor : "#008BB2",
	                      strokeColor : "#008BB2",
	                      strokeWeight : 1
	                    }
	                  },
	                  { // Surabaya
	                    options:{
	                      center:[-7.2742175,112.719087],
	                      radius : 65000,
	                      fillColor : "#008BB2",
	                      strokeColor : "#008BB2",
	                      strokeWeight : 1
	                    }
	                  },
	                  { // Bandung
	                    options:{
	                      center:[-6.9033101,107.642621],
	                      radius : 65000,
	                      fillColor : "#008BB2",
	                      strokeColor : "#008BB2",
	                      strokeWeight : 1
	                    }
	                  },
	                  { // Yogyakarta
	                    options:{
	                      center:[-7.8032504,110.3748449],
	                      radius : 65000,
	                      fillColor : "#008BB2",
	                      strokeColor : "#008BB2",
	                      strokeWeight : 1
	                    }
	                  }	                  
	                ]
	              },
	            marker:{
	                values:[
	                    {latLng:[48.8620722, 2.352047], data:"Paris !"},
	                    {address:"86000 Poitiers, France", data:"Poitiers : great city !"},
	                    {address:"66000 Perpignan, France", data:"Perpignan ! <br> GO USAP !", options:{icon: "http://maps.google.com/mapfiles/marker_green.png"}}
	                ],
	                options:{
	                    draggable: false
	                },
	                events:{
	                    mouseover: function(marker, event, context){
	                        var map = $(this).gmap3("get"),
	                            infowindow = $(this).gmap3({get:{name:"infowindow"}});
	                        if (infowindow){
	                            infowindow.open(map, marker);
	                            infowindow.setContent(context.data);
	                        } else {
	                            $(this).gmap3({
	                                infowindow:{
	                                    anchor:marker,
	                                    options:{content: context.data}
	                                }
	                            });
	                        }
	                    },
	                    mouseout: function(){
	                        var infowindow = $(this).gmap3({get:{name:"infowindow"}});
	                        if (infowindow){
	                            infowindow.close();
	                        }
	                    }
	                }
	            }
	        });
	    }

});
