;(function () {
    
    // Map
    const mapMinZoom = 1;
    const mapMaxZoom = 8;

    var map = L.map('map', {
        maxZoom: mapMaxZoom,
        minZoom: mapMinZoom 
    });

    const layer = L.tileLayer('styles/oldschool/{z}/{x}/{y}.png', {
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom
    }).addTo( map );

    map.setView([0, 0], 0);

    document.querySelector( 'button' ).addEventListener('click', () => {
        let array = getTileUrls(map.getBounds(), layer, map.getZoom())

        $.post('parse', {images: array}, response => {
            console.log( response )
        })
    })

    function getTileUrls(bounds, tileLayer, zoom) {
        var min  = map.project(bounds.getNorthWest(), zoom).divideBy(256).floor(),
            max  = map.project(bounds.getSouthEast(), zoom).divideBy(256).floor(),
            urls = [];

        for (var i = min.x; i <= max.x; i++) {
            for (var j = min.y; j <= max.y; j++) {
                var coords = new L.Point(i, j);
                coords.z = zoom;
        
                urls.push(tileLayer.getTileUrl( coords ));
            }
        }

        return urls;
    }
})();