function makePrettyDate(timestamp) {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    return `${formattedDate}`
}

function makeFirstLetterUppercase(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}

function makeTimestamp(timestamp) {
    const dateStr = `${timestamp}`;
    const dateObj = new Date(dateStr);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    return `${formattedDate}`
}

function calculateFlightDuration(durationTimestamp, arrivalTimestamp) {
    const departureTime = new Date(durationTimestamp)
    const arrivalTime = new Date(arrivalTimestamp)

    const durationMs = arrivalTime - departureTime
    const durationMin = durationMs / (1000 * 60)

    console.log(`The flight duration is ${durationMin} minutes.`)
    return `${durationMin} minutes`
}

function createFlightCards({data}) {
    let markup = ''
    for (let i = 0; i < data.length; i++) {
        const flight = data[i]
        console.log(flight)
        markup += `
            <div class="col" style="margin-bottom:1rem">
            <div class="card" style="width: 18rem;">
            <div class="card-header">
            <h5 class="card-title"><b>Arrival Airport:</b><br/>${flight.arrival.airport}</h5>
            <p class="card-text"></p>
            </div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">Airline: ${flight.airline.name}</li>
            <li class="list-group-item">Flight Number: ${flight.flight.number}</li>
            <li class="list-group-item">Date: ${makeTimestamp(flight.flight_date)}</li>
            <li class="list-group-item">Flight Duration: ${calculateFlightDuration(flight.departure.scheduled, flight.arrival.scheduled)}</li>
            <li class="list-group-item">Scheduled Departure: ${makePrettyDate(flight.departure.scheduled)}</li>
            <li class="list-group-item">Scheduled Arrival: ${makePrettyDate(flight.arrival.scheduled)}</li>
            </ul>
            <div class="card-body">
                Flight Status: ${makeFirstLetterUppercase(flight.flight_status)}
            </div>
            </div>
            </div>
            `
    }
    // console.log(markup)
    return markup
}

export { createFlightCards }

