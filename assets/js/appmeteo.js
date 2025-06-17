const form = document.getElementById('weatherForm');
const resultDiv = document.getElementById('weatherResult');
const apiKey = "e532ffa02f4ef3cb7768a4eb2c79af2d";

// Fonction pour choisir l'image météo selon la condition
function getWeatherImage(condition) {
    switch (condition) {
        case "Clear":
            return "../images/beau.jpg";
        case "Clouds":
            return "../images/nuageux.jpg";
        case "Rain":
            return "../images/pluie.jpg";
        case "Snow":
            return "../images/neige.jpg";
        case "Thunderstorm":
            return "../images/orages.jpg";
        case "Mist":
        case "Fog":
        case "Haze":
            return "../images/brouillard.jpg";
    }
}

// Fonction pour choisir la couleur de fond selon la condition
function getBackgroundColor(condition) {
    switch (condition) {
        case "Clear":
            return "#f7dc6f"; // Jaune clair
        case "Clouds":
            return "#d6dbdf"; // Gris doux
        case "Rain":
            return "#5dade2"; // Bleu-gris pluie
        case "Snow":
            return "#f2f4f4"; // Blanc-gris neige
        case "Thunderstorm":
            return "#7d3c98"; // Violet foncé
        case "Mist":
        case "Fog":
        case "Haze":
            return "#aeb6bf"; // Gris brouillard
        default:
            return "#ffffff"; // Blanc par défaut
    }
}


form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = document.getElementById("cityInput").value.trim();
    if (!city) return;

    resultDiv.innerHTML = '<p style="color: blue;">🔄 Chargement...</p>';

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr&units=metric`
        );

        if (!response.ok) {
            throw new Error('Ville introuvable');
        }

        const data = await response.json();

        const condition = data.weather[0].main;
        const imageUrl = getWeatherImage(condition);
        const bgColor = getBackgroundColor(condition);

    // Change le fond du body
    document.body.style.backgroundColor = bgColor;

        resultDiv.innerHTML = `
            <img src="${imageUrl}" alt="${condition}" style="width: 100%; margin-bottom: 20px;">
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Température : ${data.main.temp}°C</p>
            <p>Météo : ${data.weather[0].description}</p>
            <p>Vent : ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
    }
});

