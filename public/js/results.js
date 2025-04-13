// Google Maps initialization
let map, directionsService, directionsRenderer;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
  });
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  // Display route
  const request = {
    origin: tripData.start,
    destination: tripData.destination,
    travelMode: 'DRIVING',
  };
  directionsService.route(request, (result, status) => {
    if (status === 'OK') {
      directionsRenderer.setDirections(result);
      // Add weather marker
      const destination = result.routes[0].legs[0].end_location;
      new google.maps.Marker({
        position: destination,
        map,
        title: `Weather: ${tripData.weather.temp}°C, ${tripData.weather.description}`,
      });
    } else {
      alert('Could not display route. Please check locations.');
    }
  });
}

// Save trip
document.getElementById('save-trip').addEventListener('click', () => {
  const trips = JSON.parse(localStorage.getItem('trips') || '[]');
  trips.push(tripData);
  localStorage.setItem('trips', JSON.stringify(trips));
  alert('Trip saved!');
});

// Share trip (mock)
document.getElementById('share-trip').addEventListener('click', () => {
  const shareUrl = `${window.location.origin}/saved-trips`;
  navigator.clipboard.writeText(shareUrl).then(() => {
    alert('Link copied to clipboard!');
  });
});

// Hamburger menu
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});