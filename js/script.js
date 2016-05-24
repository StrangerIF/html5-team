// JavaScript File


function initMap() {
  var mapOptions = {
  zoom: 5,
  center: new google.maps.LatLng(48.923694, 24.709126)
};
  
  var map = new google.maps.Map(document.getElementById('map'),  mapOptions);
    loadXMLFile();
    
function loadXMLFile(){
  var filename = "js/places.xml";
  $.ajax({
    type: "GET",
    url:filename,
    dataType: "xml",
    success: parseXML,
    error: onXMLLoadFailed
  });
  function onXMLLoadFailed(){
    alert("An Error has occured.");
  }
  function parseXML(xml){
    
    var bounds = new google.maps.LatLngBounds();
    $(xml).find("marker").each(function(){
            var lat = $(this).find('latitude').text();
            var lng = $(this).find('longitude').text();
            var name = $(this).find('name').text();
            var markerCoords = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
            bounds.extend(markerCoords);
            var marker = new google.maps.Marker({position: markerCoords, map:map, });
            var infowindow = new google.maps.InfoWindow({
                content:name
             });
            marker.addListener('click', function() {
              infowindow.open(map, marker);
            });
            
            
            
        });
  map.fitBounds(bounds);
  }

  
  
};
 
   
};



  
