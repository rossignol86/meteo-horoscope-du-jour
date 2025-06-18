const form = document.getElementById('weatherForm');
const resultDiv = document.getElementById('weatherResult');
const apiKey = "e532ffa02f4ef3cb7768a4eb2c79af2d";

// Fonction pour choisir l'image météo selon la condition
function getWeatherImage(condition) {
    switch (condition) {
        case "Clear": return "../images/beau.webp";
        case "Clouds": return "../images/nuageux.webp";
        case "Rain": return "../images/pluie.webp";
        case "Snow": return "../images/neige.webp";
        case "Thunderstorm": return "../images/orages.webp";
        case "Mist":
        case "Fog":
        case "Haze": return "../images/brouillard.webp";
        default: return "../images/default.webp";
    }
}

// Fonction pour choisir la couleur de fond selon la condition
function getBackgroundColor(condition) {
    switch (condition) {
        case "Clear": return "#f7dc6f";
        case "Clouds": return "#d6dbdf";
        case "Rain": return "#5dade2";
        case "Snow": return "#f2f4f4";
        case "Thunderstorm": return "#7d3c98";
        case "Mist":
        case "Fog":
        case "Haze": return "#aeb6bf";
        default: return "#ffffff";
    }
}

// Fonction pour afficher l’heure lisible depuis un timestamp
function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

// Fonction Conseil du jour
function afficherConseil(meteo) {
    const conseils = {
        Clear: "Ciel dégagé ? C'est le moment idéal pour une balade ou un pique-nique !",
        Clouds: "Le ciel est couvert, pourquoi ne pas en profiter pour lire un bon livre ?",
        Rain: "N'oublie pas ton parapluie ! Une boisson chaude te fera aussi du bien.",
        Drizzle: "Une petite pluie fine... idéal pour regarder un film à la maison.",
        Thunderstorm: "Reste à l'abri, les orages sont spectaculaires mais imprévisibles !",
        Snow: "Neige au sol ? Profite du paysage mais pense à bien te couvrir.",
        Mist: "Un peu de brume ? Ralentis le rythme et reste prudent sur la route.",
        Fog: "Le brouillard invite au calme. Prends soin de toi aujourd'hui.",
        Haze: "Atmosphère voilée… hydrate-toi bien et prends une pause."
    };

    const conseil = conseils[meteo] || "Quel que soit le temps, prends soin de toi aujourd'hui.";
    document.getElementById("conseil-du-jour").textContent = conseil;
}



// Soumission du formulaire
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = document.getElementById("cityInput").value.trim();
    if (!city) return;

    resultDiv.style.display = "block"; // Affiche dynamiquement le bloc résultat
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

        const sunrise = formatTime(data.sys.sunrise);
        const sunset = formatTime(data.sys.sunset);

        document.body.style.backgroundColor = bgColor;

resultDiv.innerHTML = `
    <img src="${imageUrl}" alt="${condition}" style="width: 100%; margin-bottom: 20px;">
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>🌡️ <strong>Température :</strong> ${data.main.temp}°C</p>
    <p>🌥️ <strong>Météo :</strong> ${data.weather[0].description}</p>
    <p>💨 <strong>Vent :</strong> ${data.wind.speed} m/s</p>
    <p>🌅 <strong>Lever du soleil :</strong> ${sunrise}</p>
    <p>🌇 <strong>Coucher du soleil :</strong> ${sunset}</p>
`;

        afficherConseil(condition);

    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
    }
});

// Masquer le bloc résultat au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
    resultDiv.style.display = "none";
});
