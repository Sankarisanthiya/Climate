const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key

document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    getWeather(city);
});

async function getWeather(city) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = ''; // Clear previous error message

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}

function displayWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}
