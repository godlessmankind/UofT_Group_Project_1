function formatOptions(options) {
    let queryString = ''
    for (const key in options) {
        if (options[key] !== undefined) {
            queryString += `${key}=${options[key]}&`
        }
    }
    return queryString.slice(0, -1)
}

/* async function fetchFlights(API_KEY, options) {
    const apiUrl = 'http://api.aviationstack.com/v1/flights'
    if (!API_KEY) {
        throw new Error('No API_KEY provided')
    }
    const optionQuery = formatOptions(options)
    const data = await fetch(`${apiUrl}?access_key=${API_KEY}&${optionQuery}`)
    if (!data.ok) {
        throw new Error(`HTTP error: ${data.status}`)
    }
    const json = await data.json()
    return json
}*/

async function fetchFlights(API_KEY, options, departingIataCode) {
  const apiUrl = 'http://api.aviationstack.com/v1/flights'
  if (!API_KEY) {
    throw new Error('No API_KEY provided')
  }

  console.log(options, departingIataCode)
  const optionQuery = formatOptions(options, departingIataCode)
  const data = await fetch(`${apiUrl}?access_key=${API_KEY}&${optionQuery}`)
  if (!data.ok) {
    throw new Error(`HTTP error: ${data.status}`)
  }
  const json = await data.json()
  return json
}


export { fetchFlights };

