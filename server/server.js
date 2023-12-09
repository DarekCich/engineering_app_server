import express from 'express';
import pkg from 'body-parser';
const { json } = pkg;
const app = express();
const port = 3000;
const secretKey = 'TwójSekretnyKlucz';

//routes 
import websiteRoutes from './routes/website/website.js';
import apiRoutes from './routes/api/api.js';

app.use(json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Zezwól na dostęp z dowolnej domeny (upewnij się, że to jest bezpieczne w kontekście twojej aplikacji)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Definiuj dozwolone metody HTTP
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization'); // Definiuj dozwolone nagłówki
  res.setHeader('Access-Control-Expose-Headers', 'Authorization');
  next();
});
// app.use((req, res, next) => {
//   console.log('URL:', req.url);
//   next(); // Kontynuuj przetwarzanie żądania
// });



app.use('/website', websiteRoutes); // Przeniesione pod odpowiednie miejsce
app.use('/api', apiRoutes); // Przeniesione pod odpowiednie miejsce

app.use((req, res) => {
  res.redirect('/website/home');
});

app.listen(port, () => {
  console.log(`Serwer jest uruchomiony na porcie ${port}`);
});



