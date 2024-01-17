const contentDiv = document.getElementById('content');
function getData() {
  if(localStorage.getItem('jwtToken')){
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
  }
  axios.get('http://localhost:3000/website/login/content/')
    .then(response => {
      const { htmlContent, cssPath, jsPath } = response.data;

      const contentDiv = document.getElementById('content');
      contentDiv.innerHTML = ''; // Wyczyść zawartość contentDiv

      const iframe = document.createElement('iframe');
      iframe.srcdoc = htmlContent; // Ustawienie zawartości HTML w iframe
      contentDiv.appendChild(iframe);

      const linkCSS = document.createElement('link');
      linkCSS.rel = 'stylesheet';
      linkCSS.href = cssPath;
      iframe.contentDocument.head.appendChild(linkCSS); // Dodanie linku do stylu CSS do nagłówka iframe

      const scriptJS = document.createElement('script');
      scriptJS.src = jsPath;
      iframe.contentDocument.body.appendChild(scriptJS); // Dodanie linku do pliku JavaScript do ciała iframe
    })
    .catch(error => {
      console.error('Błąd podczas pobierania zawartości:', error);
    });
}

getData();


function receiveMessage(event) {
  if (!event.data.token){
    return
  }
  // Sprawdź, czy źródłem wiadomości jest zaufane okno dziecka
  // Odbierz dane z wiadomości
  var receivedData = event.data.token;
  axios.defaults.headers.common['Authorization'] = receivedData;
  // Tutaj możesz przetwarzać odebrane dane
  getData();
}

  // Dodaj listener do okna rodzica, który będzie nasłuchiwał na wiadomości od dziecka
  window.addEventListener('message', receiveMessage);