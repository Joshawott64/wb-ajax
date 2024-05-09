import axios from 'axios';

// PART 1: Show Dog Photo

function showDogPhoto(evt) {
  // TODO: get a random photo from the Dog API and show it in the #dog-image div
  axios.get('https://dog.ceo/api/breeds/image/random')
    .then((res) => {
      console.log(res.data)
      console.log(res.data.message)

      document.querySelector('#dog-image').innerHTML = `<img src="${res.data.message}" alt="Dog Image">`
    })
}

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);

// PART 2: Show Weather

async function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value;
  const url = `/weather.txt?zipcode=${zipcode}`

  // TODO: request weather with that URL and show the forecast in #weather-info
  const response = await axios.get(url)
  document.querySelector('#weather-info').innerText = response.data
}

document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

async function orderCookies(evt) {
  // TODO: Need to preventDefault here, because we're listening for a submit event!
  evt.preventDefault()
  // TODO: show the result message after your form
  const cookieQty = document.querySelector('#qty-field').value
  const cookieType = document.querySelector('#cookie-type-field').value
  console.log('cookieQuantity:', cookieQty)
  console.log('cookieType:', cookieType)

  let response = await axios.post('order-cookies.json',  {
    qty: cookieQty,
    cookieType: cookieType
  })

  console.log('cookie response:', response)

  const message = response.data.message
  const resultCode = response.data.resultCode
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  if (resultCode === 'ERROR') {
    document.querySelector('#order-status').className = 'order-error'
    document.querySelector('#order-status').innerText = message
  }
}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;

  // TODO: In the #itunes-results list, show all results in the following format:
  // `Artist: ${artistName} Song: ${trackName}`
  const formData = {term: searchTerm}
  const queryString = new URLSearchParams(formData).toString()
  const url = `https://itunes.apple.com/search?${queryString}`
  console.log(url)

  let response = await axios.get(url)
  console.log('response:', response.data)

  let artist = ''
  let track = ''
  console.log('artist:', artist)
  console.log('track:', track)

  for (let result in response.data.results) {
    artist = response.data.results[result].artistName
    track = response.data.results[result].trackName

    let newLi = document.createElement('li')
    newLi.innerText = `${track}: ${artist}`
    document.querySelector('#itunes-results').appendChild(newLi)
  }
}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
