// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // streets-v12 ,dark-v11 ,style URL
    center: campground.geometry.coordinates,//[80.01092032325201, 17.233487136707755], // starting position [lng, lat]
    zoom: 8, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl(), "top-right")

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)//[80.01092032325201, 17.233487136707755])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3>`
            )
    )
    .addTo(map)