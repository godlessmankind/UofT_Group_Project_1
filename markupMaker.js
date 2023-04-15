function createFlightCards({data}) {
  const { arrival } = data
  console.log(arrival)
  let markup = ''
  for (let i = 0; i < data.length; i++) {
    const flight = data[i];
    console.log(flight)
    markup += `
      <div class="col">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${flight.arrival.airport}</h5>
            <p class="card-text"></p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Price: ${flight.price}</li>
            <li class="list-group-item">Date: ${flight.flight_date}</li>
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

