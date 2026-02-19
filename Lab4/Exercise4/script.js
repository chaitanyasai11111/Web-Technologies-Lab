const apiKey = "c1a8849a8708db8179bdc9daf560f596"; // Replace with your OpenWeather API key
let lastCity = null;
let cachedData = null;

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const statusDiv = document.getElementById("status");
    const weatherBox = document.getElementById("weatherBox");

    if (city === "") {
        statusDiv.innerHTML = "Please enter a city name.";
        statusDiv.className = "error";
        return;
    }

    // If same city searched again → use cache
    if (city === lastCity && cachedData !== null) {
        displayWeather(cachedData);
        return;
    }

    statusDiv.innerHTML = '<div class="spinner"></div>';
    statusDiv.className = "loading";
    weatherBox.style.display = "none";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            lastCity = city;
            cachedData = data;
            displayWeather(data);
        })
        .catch(error => {
            statusDiv.innerHTML = error.message;
            statusDiv.className = "error";
            weatherBox.style.display = "none";
        });
}

function displayWeather(data) {
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = data.main.temp;
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("condition").innerText = data.weather[0].description;

    document.getElementById("weatherBox").style.display = "block";

    document.getElementById("status").innerHTML = "";
}
