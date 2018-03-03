/*jslint browser:true */
function addr_search() {

    var inp = document.getElementById("addr");

    $.getJSON('https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=GB&namedetails=1&q=' + inp.value, function(data) {
        var items = [];
        var bounding_box = [];
        var cymraeg;
        var zoom;


        
        
        $.each(data, function (key, val) {
            lat = val.lat;
            lon = val.lon;
            cymraeg = val["namedetails"]["name:cy"];
            
    
            
                if (val.boundingbox[2] < 0) {
                    val.boundingbox[2] = - val.boundingbox[2];
                    } 
                else {
                    val.boundingbox[2] =  val.boundingbox[2];
                    }
                if (val.boundingbox[3] < 0) {
                    val.boundingbox[3] = - val.boundingbox[3];
                    } 
                else {
                    val.boundingbox[3] =  val.boundingbox[3];
                    }
            
            if (val.boundingbox[2] < val.boundingbox[3]){
                scroll_test_sum = val.boundingbox[3] - val.boundingbox[2];
            } else {
                scroll_test_sum = val.boundingbox[2] - val.boundingbox[3];
            }

            
            if (scroll_test_sum <= 0.004){
                 zoom = 18;
            } else if (scroll_test_sum <= 0.0055){
                 zoom = 17;
            } else if (scroll_test_sum <= 0.055){
                 zoom = 16;
            } else if (scroll_test_sum <= 0.075){
                 zoom = 13;
            } else if (scroll_test_sum <= 0.15){
                 zoom = 12;
            } else if (scroll_test_sum <= 0.45){
                 zoom = 11;
            } else {
                 zoom = 10;
            }
            
            if (val.class === "highway"){
                  fontawesomeclass = "'fas fa-road'";
            } else if (val.class === "building" || val.class === "amenity"){
                  fontawesomeclass = "'fas fa-building'";
            } else if (val.class === "place"){
                  fontawesomeclass = "'fas fa-map-marker'";
            } else if (val.class === "boundary"){
                  fontawesomeclass = "'fas fa-circle-notch'";
            } else if (val.class === "landuse"){
                  fontawesomeclass = "'fas fa-expand'";
            } else if (val.class === "railway"){
                  fontawesomeclass = "'fas fa-train'";
            } else if (val.class === "waterway"){
                  fontawesomeclass = "'fas fa-ship'";
            } else if (val.class === "natural"){
                  fontawesomeclass = "'fas fa-leaf'";
            } else {
                  fontawesomeclass = "'fas fa-angle-right'";
            }
            


            items.push("<li> Welsh name: " + cymraeg + "<br>English name: " + val.display_name + "<br> This is a: " + "<i class=" + fontawesomeclass + "></i>   "+ val.class + "   " + val.type + "<br><a target=”_blank” href=https://openstreetmap.cymru/?h=" + lat + "&ll=" + lon + "&ch=" + zoom + "> View this on openstreetmap.cymru</a>  </li>");

        });

		$('#results').empty();
        if (items.length != 0) {
            $('<p>', { html: "Search results:" }).appendTo('#results');
            $('<ul/>', {
                'class': 'my-new-list',
                html: items.join('')
            }).appendTo('#results');
        } else {
            $('<p>', { html: "No results found" }).appendTo('#results');
        }
    });
}
