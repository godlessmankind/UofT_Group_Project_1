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
            <div class="col">
            <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${flight.arrival.airport}</h5>
            <p class="card-text"></p>
            </div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">Flight Duration: ${calculateFlightDuration(flight.departure.scheduled, flight.arrival.scheduled)}</li>
            <li class="list-group-item">Date: ${makeTimestamp(flight.flight_date)}</li>
            <li class="list-group-item">Departure Time: ${flight.arrival.scheduled}</li>
            </ul>
            <div class="card-body">
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
            </div>
            </div>
            </div>
            `
    }
    console.log(markup)
    return markup
}

export { createFlightCards }

