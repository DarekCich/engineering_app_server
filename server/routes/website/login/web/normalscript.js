
function git(){
  console.log('git');
  window.parent.postMessage('test', "*" //or "www.parentpage.com"
); 
}

function blad(){
  console.log('blad')
  window.parent.postMessage('blad',"*");
}

const form = document.getElementById('myForm');

// Obsługa zdarzenia submit formularza
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Zapobiegaj domyślnej akcji formularza (wysłaniu na nową stronę)

  const username = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  axios.post('http://localhost:3000/api/noprotected/login', {
    username: username,
    password: password
  })
  .then(response => {
    if (response.headers.authorization) {
      const receivedToken = response.headers.authorization; // Wyodrębnienie samego tokenu z nagłówka 'Authorization'
      const messageObject = {
        token: receivedToken,
      };
      localStorage.setItem('jwtToken', receivedToken); // Zapis tokena JWT w localStorage
      window.parent.postMessage(messageObject,"*");
      // Ustawienie nagłówka 'Authorization' dla kolejnego żądania do /website/userHomePage
      // Przekierowanie użytkownika do /website/userHomePage z ustawionym nagłówkiem 'Authorization'
    } else {
      console.log("blad");
    }
  })
  .catch(error => {
    console.error('Błąd żądania axios:', error);
  });

});
