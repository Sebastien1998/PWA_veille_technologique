const technosDiv = document.querySelector('#technos');

function rss(RSS_URL){
    fetch(RSS_URL)
    .then(response => response.text())
    .then(data => {
        console.log(data);
        let html = ``;
        var json = JSON.parse(data)
        element = json.items[0];
        console.log(element);
        html += `
            <article>
            <h2>
            <br> 
                <p style="text-decoration: none; color: black">
                ${element['description'].replace("]]>", "").replace}
                </p>
            </h2>
            </article>
        `;
        document.body.insertAdjacentHTML("beforeend", html);
    });
}

function rss_developpez(RSS_URL){
    fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/html"))
    .then(data => {
 
        console.log(data);
        const items = data.querySelectorAll("item");
        let html = ``;
        element = items[0]
        html += `
            <article>
            <h2>
            <a href="${element.querySelector("guid").innerHTML}" target="_blank">
            <img src="${element.querySelector("enclosure").getAttribute("url")}">
            <a/>
            <br>
                <a href="${element.querySelector("guid").innerHTML}" target="_blank" style="text-decoration: none; color: black">
                ${element.querySelector("description").innerHTML.replace("]]", "")}
                </a>
            </h2>
            </article>
        `;
        document.body.insertAdjacentHTML("beforeend", html);
    });

}

function loadTechnologies(technos) {
    fetch('http://localhost:3001/technos')
        .then(response => {
            response.json()
                .then(technos => {
                    const allTechnos = technos.map(t => `
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">${t.name}</h5>
                        <p class="card-text">${t.description}</p>
                        <a href="${t.url}" class="card-link">site de ${t.name}</a>
                        </div>
                    </div>`)
                            .join('');
            
                    technosDiv.innerHTML = allTechnos; 
                });
        })
        .catch(console.error);
}

loadTechnologies(technos);
rss_developpez("https://www.developpez.com/index/rss");
rss("https://api.rss2json.com/v1/api.json?rss_url=" +"https://www.tech2tech.fr/feed/");
rss("https://api.rss2json.com/v1/api.json?rss_url=" + "https://feed.infoq.com/Programming-Languages/news/")


if(navigator.serviceWorker) {
    navigator.serviceWorker
        .register('sw.js')
        .catch(err => console.error('service worker NON enregistré', err));
}

//..
//7.1 Notifications non persistantes
// // Vérifie si la fonctionalité est disponible et si 
// l'utilisateur n'a pas refusé les notifications
// 7.3 Notifications persistantes (envoyées depuis le service worker)
// Mettre en commentaire cette partie
/* 
if(window.Notification && window.Notification !== "denied"){
    // demande une permission
    Notification.requestPermission(perm => {
        // vérifie si la permission est acceptée par l'utilisateur
        if(perm === "granted"){
            
            // 7.2 Option de la notification
            const options = {
                body : "Body de la notification",
                icon : "images/icons/icon-72x72.png"
            }

            // On crée une nouvelle notification
            // 7.2 On passe les options en deuxième argument
            const notif = new Notification("Hello notification", options);
          
        }
        else{
            // Notification refusée
            console.log("Notification refusée");
        }
    })
}
*/