import { fetchFlights } from './flightUtils.js'
import { createFlightCards } from './markupMaker.js'

async function handleClick() {
    const API_TOKEN = 'a665724dbc8086dc3881e7433cfe937f'
    //const API_TOKEN = '16f12abe30fcc9c81cadf685ba9106f0'


    try {
        const destination = document.querySelector('#flightField').value.toLowerCase()
        const flightData = await fetchData(API_TOKEN, destination)

        const cards = createFlightCards(flightData)
        if (!cards) {
            return
        }

        const cols = document.querySelectorAll('.col')
        cols.forEach(col => col.remove())
        document.querySelector('#flights').innerHTML = cards
    } catch (error) {
        console.error(error)
    }
}

document.querySelector('#searchFlights').addEventListener('click', handleClick)

async function getIataFromJSON(city) {
  try {
    const response = await fetch('./iataCityMap.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch iataCityMap.json: ${response.statusText}`);
    }

    const data = await response.json();
    const iataCode = data[city];
    if (!iataCode) {
      throw new Error(`No iataCode found for city: ${city}`);
    }

    return iataCode;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function fetchData(API_KEY, city) {
  const depIataCodePromise = getIataFromJSON(city);
  const optionsPromise = depIataCodePromise.then(depIataCode => {
    return {
      dep_iata: depIataCode,
      arr_iata: 'JFK',
      flight_status: 'scheduled',
      limit: 100,
    };
  });
  const [depIataCode, options] = await Promise.all([depIataCodePromise, optionsPromise]);
  const flightsData = await fetchFlights(API_KEY, options, depIataCode);
  console.log(flightsData);
  return flightsData
}

/*
    const access_key = '6d43e0c1a76a587aa7916067ef626d0a'
const baseUrl = 'http://api.aviationstack.com/v1/'
const requestUrl = `http://api.aviationstack.com/v1/flights?${access_key}`
const cityRequestUrl = 'http://api.aviationstack.com/v1/cities?access_key=6d43e0c1a76a587aa7916067ef626d0a'
// 10a0278a639dacf553b12043ab164985
// f0ab3d833bf1c9e6f32e08a4321fd22b
// 89feda8620b7905d1b2836c9d6f1f5b6
// 9702e1ceb85e3979dec33f6e6f98e503
// 16f12abe30fcc9c81cadf685ba9106f0
// 89feda8620b7905d1b2836c9d6f1f5b6
// 'cc3ff46cc95ac84190601c134ef11f6b'
// ?access_key=7743bd2360dcdaa0e1f052dbd7db8e38
// access_key=89feda8620b7905d1b2836c9d6f1f5b6O
// ?access_key=a665724dbc8086dc3881e7433cfe937f
// const ACCESS_KEY = "bd3f337059ff12309b2d12f3f89ec318"
// ?access_key=d2b5ae8338f4deac5ae15440f366ce53&limit=3&airline_iata=SQ&
    /*
    const options1 = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '097fd673a7msh7f511efd9cb5a26p13097cjsnaf0f7f767f24',
            'X-RapidAPI-Host': 'skyscanner-api.p.rapidapi.com'
        },
        body: '{"query":{"market":"UK","locale":"en-GB","currency":"EUR","queryLegs":[{"originPlaceId":{"iata":"LHR"},"destinationPlaceId":{"iata":"DXB"},"date":{"year":2023,"month":9,"day":20}}],"cabinClass":"CABIN_CLASS_ECONOMY","adults":2,"childrenAges":[3,9]}}'
    };

fetch('https://skyscanner-api.p.rapidapi.com/v3e/flights/live/search/synced', options1)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
*/
