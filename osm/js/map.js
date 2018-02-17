/*jslint browser:true */
function addr_search() {

    var inp = document.getElementById("addr");

    $.getJSON('https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=GB&namedetails=1&q=' + inp.value, function(data) {
        var items = [];
        var cymraeg;
        var zoom;
        var place_type;

        $.each(data, function (key, val) {
            lat = val.lat;
            lon = val.lon;
            cymraeg = val["namedetails"]["name:cy"];
            place_type = val.type;
                        if (place_type === "country" || place_type === "continent" || place_type === "archipelago") {
                zoom = 7;
            } else if (place_type === "state" || place_type === "region") {
                zoom = 8;
            } else if (place_type === "province" || place_type === "district" || place_type === "county" || place_type === "island") {
                zoom = 9;
            } else if (place_type === "municipality" || place_type === "islet") {
                zoom = 12;
            } else if (place_type === "city") {
                zoom = 13;
            } else if (place_type === "town" || place_type === "borough") {
                zoom = 14;
            } else if (place_type === "suburb" || place_type === "village" || place_type === "hamlet") {
                zoom = 15;
            } else if (place_type === "quarter" || place_type === "neighbourhood" || place_type === "city_block" || place_type === "allotments" || place_type === "square" || place_type === "locality") {
                zoom = 16;
            } else if (place_type === "farm" || place_type === "plot" || place_type === "isolated_dwelling") {
                zoom = 17;
            } else {
                zoom = 12;
            }

            items.push("<li><a target=”_blank” href=https://openstreetmap.cymru/?h=" + lat + "&ll=" + lon + "&ch=" + zoom + ">" + cymraeg + "  ...  " + val.display_name + "  ...  " + val.osm_type + "</a>  </li>");

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
