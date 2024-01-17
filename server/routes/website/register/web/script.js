
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

  axios.post('http://localhost:3000/api/noprotected/login',{
      username: username,
      password: password
    })
    .then(response => {
      // if (response.headers.authorization) {
      //   const receivedToken = response.headers.authorization; // Wyodrębnienie samego tokenu z nagłówka 'Authorization'
      //   window.parent.postMessage(receivedToken,"*");
      // } else {
      // }
      console.log(response.data);
    })
  .catch(error => {
    console.error('There has been a problem with your axios request:', error);
  });
});