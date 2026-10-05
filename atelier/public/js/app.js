const form = document.querySelector('#chat-form');
const status = document.querySelector('#status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = 'Interface prête.';
});
