function on_start(){
  if(localStorage.getItem('jwtToken')){
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
  }
  axios.get('http://localhost:3000/api/protected/list')
  .then(response => {
    // Obsługa odpowiedzi z serwera
    const data = response.data;
    createHTMLList(data)
  })
  .catch(error => {
    // Obsługa błędów
    console.error('Błąd podczas pobierania danych:', error);
  });
}
on_start();

function createHTMLList(data) {
  const container = document.getElementById('lists-container');
  container.appendChild(createList(data))
}

function createList(data) {
  const listContainer = document.createElement('ul');

  data.forEach(item => {
    const listItem = document.createElement('li');
    if(item.name){
      listItem.textContent = item.name;
      listContainer.appendChild(listItem);
      listContainer.appendChild(createList(item.files));
    }else{
      listItem.textContent = item;
      listContainer.appendChild(listItem);
    }
  });

  return listContainer;
}