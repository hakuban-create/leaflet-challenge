let queryUrl =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

let map = L.map("map", {
  center: [39, -111],
  zoom: 7,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
  map
);

fetch(queryUrl)
  .then((response) => response.json())
  .then((data) => {
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        var color = getColor(feature.geometry.coordinates[2]);
        var radius = feature.properties.mag * 6;

        return L.circleMarker(latlng, {
          color: "grey",
          fillColor: color,
          fillOpacity: 0.75,
          radius: radius,
        }).bindPopup(
          `<h3>${feature.properties.place}</h3>
          <hr><p>Magnitude: ${feature.properties.mag}</p>
          <hr><p>Timestamp: ${new Date(feature.properties.time)}</p>`
        );
      },
    }).addTo(map);
  });

function getColor(depth) {
  return depth > 70
    ? "#ff5f65"
    : depth > 70
    ? "#fca35e"
    : depth > 50
    ? "#fca35e"
    : depth > 30
    ? "#f7db11"
    : depth > 10
    ? "#ddf402"
    : "#a4f600";
}
