async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = '3828ff328f292ae2cb7bf92ae19f235d'; // Replace this with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data.cod === 200) {
      document.getElementById("weatherResult").innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      `;
    } else {
      document.getElementById("weatherResult").innerHTML = `<p>City not found!</p>`;
    }
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>Error fetching weather.</p>`;
    console.error("Fetch error:", error);
  }
}

// 👇 Add this code to listen for Enter key
document.getElementById("cityInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});
