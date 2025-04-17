let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
  });

  // Add markers for favorites
  const favorites = JSON.parse(document.getElementById('favorites-list').dataset.favorites || '[]');
  favorites.forEach(favorite => {
    if (favorite.coordinates) {
      new google.maps.Marker({
        position: { lat: favorite.coordinates.lat, lng: favorite.coordinates.lng },
        map,
        title: favorite.name,
      });
    }
  });
}

// Hamburger menu
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});