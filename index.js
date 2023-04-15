const access_key = '6d43e0c1a76a587aa7916067ef626d0a'
const baseUrl = 'http://api.aviationstack.com/v1/'
const requestUrl = `http://api.aviationstack.com/v1/flights?${access_key}`
const cityRequestUrl = 'http://api.aviationstack.com/v1/cities?access_key=6d43e0c1a76a587aa7916067ef626d0a'

const options = {
    limit: 1,
    flight_number: '2102',
    flight_date: '2023-04-25',
    arr_iata: 'SEA'
}
// fetch(requestUrl, options)
fetch(cityRequestUrl, options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));

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
