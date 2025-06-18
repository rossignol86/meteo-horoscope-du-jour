        fetch('https://oracles-api.sidathsoeun.fr/oracle_api_php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                api_key: "SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!"
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('result');
            container.innerHTML = ''; // Efface "Chargement en cours..."

            // Si les données sont un tableau
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'item';
                    div.textContent = JSON.stringify(item, null, 2); // tu peux adapter ici
                    container.appendChild(div);
                });
            } else {
                // Si c'est un objet simple
                const pre = document.createElement('pre');
                pre.textContent = JSON.stringify(data, null, 2);
                container.appendChild(pre);
            }
        })
        .catch(error => {
            document.getElementById('result').textContent = "Erreur : " + error.message;
        });