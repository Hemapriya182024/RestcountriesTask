document.addEventListener('DOMContentLoaded', () => {
  const countryCardsContainer = document.getElementById('country-cards');

  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
      countries.forEach(country => {
        const cardCol = document.createElement('div');
        cardCol.className = 'col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-4';

        const card = document.createElement('div');
        card.className = 'card h-100';

        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        cardHeader.textContent = country.name.common;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardImage = document.createElement('img');
        cardImage.src = country.flags.svg;
        cardImage.className = 'card-img-top';
        cardImage.alt = `Flag of ${country.name.common}`;

        const cardTextDiv = document.createElement('div');
        cardTextDiv.className = 'card-text';
        cardTextDiv.innerHTML = `
          <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Native Name:</strong> ${country.nativeName ? Object.values(country.nativeName)[0].common : 'N/A'}</p>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          <p><strong>Lat/Lng:</strong> ${country.latlng.join(', ')}</p>
          <p><strong>Country Code:</strong> ${country.cca2}</p>
          <button class="btn btn-primary weather-btn" data-lat="${country.latlng[0]}" data-lng="${country.latlng[1]}">Get Weather</button>
        `;

        cardBody.appendChild(cardImage);
        cardBody.appendChild(cardTextDiv);

        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        cardCol.appendChild(card);
        countryCardsContainer.appendChild(cardCol);
      });

      document.querySelectorAll('.weather-btn').forEach(button => {
        button.addEventListener('click', event => {
          const lat = event.target.getAttribute('data-lat');
          const lng = event.target.getAttribute('data-lng');
          simulateWeather(lat, lng);
        });
      });
    });

  function simulateWeather(lat, lng) {
    const weatherData = {
      main: { temp: Math.round(Math.random() * 30) },
      weather: [{ description: 'Sunny' }]
    };
    const weatherInfo = `Temperature: ${weatherData.main.temp} °C, Weather: ${weatherData.weather[0].description}`;
    alert(weatherInfo);
  }
});
