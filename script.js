function sendToWhatsApp() {
  let name = document.getElementById('name').value;
  let phone = document.getElementById('phone').value;
  let service = document.getElementById('service').value;
  let message = document.getElementById('message').value;

  let text =
    'Hello KandoTech Solutions!%0A%0A' +
    'Name: ' +
    name +
    '%0A' +
    'Phone: ' +
    phone +
    '%0A' +
    'Service: ' +
    service +
    '%0A' +
    'Problem: ' +
    message;

  let url = 'https://wa.me/26582015682?text=' + text;

  window.open(url, '_blank');
}
