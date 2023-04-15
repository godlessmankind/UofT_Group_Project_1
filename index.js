import { fetchFlights } from './flightUtils.js'
import { createFlightCards } from './markupMaker.js'

async function handleClick() {
    const API_TOKEN = '16f12abe30fcc9c81cadf685ba9106f0'


    try {
        const destination = document.querySelector('#flightField').value.toLowerCase()
        console.log(destination)
        const flightData = await fetchData(API_TOKEN, destination)
        console.log(flightData)

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
    throw error; // Rethrow the error to be handled by the caller
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


/*async function fetchData(API_KEY, city) {
  const depIataCode = await getIataFromJSON(city);
  const options = {
    dep_iata: depIataCode, // Use the value returned from getIataFromJSON here
    arr_iata: 'JFK',
    flight_status: 'scheduled',
    limit: 100,
  };
  console.log(options, 'sum')
  const flightsData = await fetchFlights(API_KEY, options, depIataCode); // Pass depIataCode here as well
  console.log(flightsData);
}

// fetchData();

/*

async function getIataFromJSON(city) {
    fetch('./iataCityMap.json')
        .then(response => response.json())
        .then(data => {
            const iataCode = data[city]
            console.log(iataCode)
            return iataCode
        })
        .catch(error => console.error(error))
}

/*
    const access_key = '6d43e0c1a76a587aa7916067ef626d0a'
const baseUrl = 'http://api.aviationstack.com/v1/'
const requestUrl = `http://api.aviationstack.com/v1/flights?${access_key}`
const cityRequestUrl = 'http://api.aviationstack.com/v1/cities?access_key=6d43e0c1a76a587aa7916067ef626d0a'

function formatOptions(options) {
    let queryString = ''
    for (const key in options) {
        if (options[key] !== undefined) {
            queryString += `${key}=${options[key]}&`
        }
    }
    return queryString.slice(0, -1)
}

async function flights({ API_KEY, options }) {
    const apiUrl = 'http://api.aviationstack.com/v1/flights'
    if (!API_KEY) {
        throw new Error('No API_KEY provided')
    }
    const optionQuery = formatOptions(options)
    const data = await fetch(`${apiUrl}?access_key=${API_KEY}${optionQuery}`)
    if (!data.ok) {
        throw new Error(`HTTP error: ${data.status}`)
    }
    const json = await data.json()
    return json
}

const API_KEY = '7743bd2360dcdaa0e1f052dbd7db8e38'
const options = { flight_status: 'active', limit: 100 }
flights({ API_KEY, options })
    .then(data => {
        console.log(data) // do something with the flight data
    })
    .catch(error => {
        console.error(error) // handle errors
    });

async function handleClick() {
    const API_TOKEN = 'your_api_token_here'
    const options = {
        dep_iata: 'JFK',
        arr_iata: 'LHR',
        flight_status: 'scheduled',
        limit: 10,
    }

    try {
        const flightData = await flights({ API_TOKEN, options })
        console.log(flightData)
    } catch (error) {
        console.error(error)
    }
}

document.querySelector('#myButton').addEventListener('click', handleClick)

// ?access_key=53cd9310851e3d1252a091b1fb74e458
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
