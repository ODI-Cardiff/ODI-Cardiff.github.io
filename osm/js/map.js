function addr_search() {
    var inp = document.getElementById("addr");

    $.getJSON('https://nominatim.openstreetmap.org/search?format=json&limit=5&namedetails=1&q=' + inp.value, function(data) {
        var items = [];
        var cymraeg;

        $.each(data, function(key, val) {
            lat = val.lat;
            lon = val.lon;
            cymraeg = val['namedetails']['name:cy'];
  
            items.push("<li><a target=”_blank” href=https://openstreetmap.cymru/?h=" + lat + "&ll=" + lon + "&ch=12>" + val.display_name + " ... " +  "..." + val.osm_type + cymraeg + "</a>  </li>");

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
