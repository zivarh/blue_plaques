var map; // The map object
var myCentreLat = 53.77;
var myCentreLng = -1.49;
var initialZoom = 14;

let currentInfoWindow = null;
let currentMarker = null;

// with callBack when you click on marker infowindows appears. I added additional functionality so when you open next infopage previous one gets closed automatically
function infoCallback(infowindow, marker) {
	return function() {
	  if (currentInfoWindow) {
		currentInfoWindow.close();
	  }
  	  infowindow.open(map, marker);
	  currentInfoWindow = infowindow;
	  currentMarker = marker;
	};
  }

  // here I used already downloaded icon for map markers
  var icon = {
	url: "location.png", // url
	scaledSize: new google.maps.Size(30, 30), // size
};

// this function addMarker with given Position, title and icon, and infowindow
function addMarker(myPos,myTitle,myInfo) {
	var marker = new google.maps.Marker({
		position: myPos,
		map: map,
		title: myTitle,
		icon: icon
	});
   var infowindow = new google.maps.InfoWindow({content: myInfo});
   
   google.maps.event.addListener(marker,'click', infoCallback(infowindow, marker));
}
// with this function we initialize the google maps. AFter creating map, function iterates with markerData.js and adds markers by using addMarker function
// it lso add info window for each marker. I additianally wanted to display date, unveiler where applicable for each location. So they also will displayed on info windows 
function initialize() {
   var latlng = new google.maps.LatLng(myCentreLat,myCentreLng);
   var myOptions = {
		zoom: initialZoom,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   
   map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);

   for (id in os_markers) {
		var info = "<div class=infowindow><h3>" +
			os_markers[id].title + "</h3><p>"+os_markers[id].unveiler + "</p><p>"+os_markers[id].location + "</p><p>"+
			os_markers[id].date + "</p><p>"+os_markers[id].caption + "</p></div>";
		
		// Convert co-ords
		var osPt = new OSRef(
			os_markers[id].northing,os_markers[id].easting);
		
		var llPt = osPt.toLatLng(osPt);
		llPt.OSGB36ToWGS84();
		
		addMarker(
			new google.maps.LatLng(llPt.lat,llPt.lng),
			os_markers[id].title,info);
		
		

   }
}
