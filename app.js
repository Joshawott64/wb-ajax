import express from 'express';
import ViteExpress from 'vite-express';
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
const port = 8000;
ViteExpress.config({ printViteDevServerHost: true });

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
const WEATHER = {
  '90210': {'forecast': 'Very warm. Good for sunbathing with movie stars.', 'temp': '90F'},
  '97202': {'forecast': 'Rainy, damp, and rich with hipsters.', 'temp': '60F'},
  '20004': {'forecast': 'Full of hot air.', 'temp': '95F'},
  '99709': {'forecast': 'Very cold. May need to crawl inside a Tauntaun for warmth.', 'temp': '-25F'}
}

const DEFAULT_FORECAST = 'Kind of boring.';

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '.' });
});

app.get('/weather.txt', (req, res) => {
  const zipcode = req.query.zipcode;
  const weather = WEATHER[zipcode]
  // TODO: Get the weather for this zipcode and return the forecast if available.
  // If not, return the default forecast.
  if (weather) {
    res.send(weather.forecast)
  } else {
    res.send(DEFAULT_FORECAST)
  }
  
})

app.post('/order-cookies.json', (req, res) => {
  const cookieType = req.body.cookieType;
  const qty = Number(req.body.qty);

  console.log('quantity:', req.body)

  let message;
  let resultCode = "OK";
  if (qty > 36) {
    message = "Sorry, there is a limit of 3 dozen cookies.";
    resultCode = "ERROR";
  }
  else if (qty < 1) {
    message = "Invalid quantity.";
    resultCode = "ERROR";
  }
  else {
    message = `Your order of ${qty} ${cookieType} cookies has been confirmed.`
  }
  res.json({resultCode: resultCode, message: message});
})

ViteExpress.listen(app, port, () => console.log(`Server running on http://localhost:${port}`));
