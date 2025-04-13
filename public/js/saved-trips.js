// Display saved trips
const tripsList = document.getElementById('trips-list');
const trips = JSON.parse(localStorage.getItem('trips') || '[]');

if (trips.length > 0) {
  tripsList.innerHTML = '';
  trips.forEach((trip, index) => {
    const tripCard = document.createElement('div');
    tripCard.className = 'trip-card';
    tripCard.innerHTML = `
      <p><strong>Trip ${index + 1}</strong></p>
      <p>From: ${trip.start}</p>
      <p>To: ${trip.destination}</p>
      <p>Dates: ${trip.dates}</p>
      <p>Interests: ${trip.interests || 'None'}</p>
      <p>Weather: ${trip.weather.temp}°C, ${trip.weather.description}</p>
      <button class="btn" onclick="deleteTrip(${index})">Delete</button>
    `;
    tripsList.appendChild(tripCard);
  });
}

// Delete trip
function deleteTrip(index) {
  const trips = JSON.parse(localStorage.getItem('trips') || '[]');
  trips.splice(index, 1);
  localStorage.setItem('trips', JSON.stringify(trips));
  location.reload();
}

// Hamburger menu
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});