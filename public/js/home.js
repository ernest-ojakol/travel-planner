// Google Maps initialization
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
  });
}

// Hamburger menu
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Login modal
const loginModal = document.getElementById('login-modal');
const loginBtn = document.getElementById('login-btn');
const closeModal = document.querySelector('.close');
const loginForm = document.getElementById('login-form');
const signupBtn = document.getElementById('signup-btn');

loginBtn.addEventListener('click', () => {
  loginModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = 'none';
  }
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  localStorage.setItem('user', username);
  loginModal.style.display = 'none';
  loginBtn.textContent = `Hi, ${username}`;
});

signupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  alert('Signup feature coming soon!');
});

// Check for logged-in user
const user = localStorage.getItem('user');
if (user) {
  loginBtn.textContent = `Hi, ${user}`;
}