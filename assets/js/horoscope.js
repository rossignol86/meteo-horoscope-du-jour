fetch("https://oracles-api.sidathsoeun.fr/oracle_api.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        api_key: "SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!"
    })
})
.then(response => response.json())
.then(data => {
    const container = document.getElementById("cards-container");

    if (!data || data.error || !data.horoscope) {
        container.innerHTML = `<p class="card">Réponse inattendue de l’API.</p>`;
        return;
    }

    container.innerHTML = "";

    // Palette couleurs + pictos emoji par signe astrologique
    const signData = {
        "Bélier":    { color: "#FFADAD", emoji: "♈️" },
        "Taureau":   { color: "#FFD6A5", emoji: "♉️" },
        "Gémeaux":   { color: "#FDFFB6", emoji: "♊️" },
        "Cancer":    { color: "#CAFFBF", emoji: "♋️" },
        "Lion":      { color: "#9BF6FF", emoji: "♌️" },
        "Vierge":    { color: "#A0C4FF", emoji: "♍️" },
        "Balance":   { color: "#BDB2FF", emoji: "♎️" },
        "Scorpion":  { color: "#FFC6FF", emoji: "♏️" },
        "Sagittaire":{ color: "#FFFFFC", emoji: "♐️" },
        "Capricorne":{ color: "#FFC9DE", emoji: "♑️" },
        "Verseau":   { color: "#D0F4DE", emoji: "♒️" },
        "Poissons":  { color: "#E0BBE4", emoji: "♓️" }
    };

    for (const signe in data.horoscope) {
        const message = data.horoscope[signe];
        const { color, emoji } = signData[signe] || { color: "#ccc", emoji: "❓" };

        const card = document.createElement("div");
        card.className = "card";
        card.style.backgroundColor = color;
        card.style.color = "#fff";

        card.innerHTML = `
            <h2>${emoji} ${signe}</h2>
            <p>${message}</p>
        `;

        container.appendChild(card);
    }
})
.catch(error => {
    document.getElementById("cards-container").innerHTML =
        `<p class="card">Erreur lors du chargement : ${error.message}</p>`;
});