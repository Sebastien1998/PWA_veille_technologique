const technosDiv = document.querySelector('#row');

const cacheName = 'veille-techno' + '1.1';

function rss_tech2tech(RSS_URL){
    fetch(RSS_URL)
    .then(response => response.text())
    .then(data => {
        console.log(data);
        let html = ``;
        var json = JSON.parse(data)
        element = json.items[0];


        let articles;
        fetch("https://us-central1-pwa-veille-techno.cloudfunctions.net/getArticles")
        .then((res) =>
            res.json())
        .then((obj) => {
            articles = obj;
            var exists = false;
            console.log(articles);
            articles.forEach(elt => {
                if (elt['title'] == element['title']){
                    exists = true;
                }
            });

            if (!exists && element['title'] != ""){

                const payload = {
                    id: Date.now(),
                    title: element["title"],
                    description: element["description"],
                    url: element["link"]
                }
                fetch('https://us-central1-pwa-veille-techno.cloudfunctions.net/addArticle', { 
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(resp => {
                    console.log(resp);
                })
                .catch(error => console.error(error));

                
            }
            })
            .catch((err) => {
                console.error(err);
            });

            html += `
                    <div class="article" target="_blank">
                        <p style="text-decoration: none; color: black">
                        ${element['description'].replace("]]>", "")}
                        </p>
                        <form action="${element["link"]}">
                            <input type="submit" value="Go to Article" />
                        </form>
                    </div>
                `;
                document.body.insertAdjacentHTML("beforeend", html);
            
    }).catch(console.error);
}

function rss_infoq(RSS_URL){
    fetch(RSS_URL)
    .then(response => response.text())
    .then(data => {
        console.log(data);
        let html = ``;
        var json = JSON.parse(data)
        element = json.items[0];

        let articles;
        fetch("https://us-central1-pwa-veille-techno.cloudfunctions.net/getArticles")
        .then((res) =>
            res.json())
        .then((obj) => {
            articles = obj;
            var exists = false;
            console.log(articles);
            articles.forEach(elt => {
                if (elt['title'] == element['title']){
                    exists = true;
                }
            });

            if (!exists && element['title'] != ""){

                const payload = {
                    id: Date.now(),
                    title: element["title"],
                    description: element["description"],
                    url: element["link"]
                }
                fetch('https://us-central1-pwa-veille-techno.cloudfunctions.net/addArticle', { 
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(resp => {
                    console.log(resp);
                })
                .catch(error => console.error(error));

                
            }
            })
            .catch((err) => {
                console.error(err);
            });

            html += `
                    <div class="article">
                        <p style="text-decoration: none; color: black">
                        ${element['description'].replace("]]>", "")}
                        </p>
                        <form action="${element["link"]}">
                            <input type="submit" value="Go to Article" />
                        </form>
                    </div>
                `;
                document.body.insertAdjacentHTML("beforeend", html);
    }).catch(console.error);
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

        let articles;
        fetch("https://us-central1-pwa-veille-techno.cloudfunctions.net/getArticles")
        .then((res) => 
             res.json())
        .then((obj) => {
            articles = obj;
            var exists = false;
            articles.forEach(elt => {
                if (elt['title'] == element.querySelector('title').innerText){
                    exists = true;
                }
            });

            if (!exists && element.querySelector('title').innerText != "")
            {
                const payload = {
                    id: Date.now(),
                    title: element.querySelector("title").innerText,
                    description: element.querySelector("description").innerText,
                    url: element.querySelector("guid").innerHTML
                }
                fetch('https://us-central1-pwa-veille-techno.cloudfunctions.net/addArticle', { 
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(resp => {
                    console.log(resp);
                })
                .catch(error => console.error(error));

                
            }
        })
        .catch((err) => {
            console.error(err);
        });

        html += `
                    <div class="article">
                    <img src="${element.querySelector("enclosure").getAttribute("url")}">
                    <br>
                        <p style="text-decoration: none; color: black">
                        ${element.querySelector("description").innerHTML.replace("]]", "")}
                        </p>
                        <form action="${element.querySelector("guid").innerHTML}">
                            <input type="submit" value="Go to Article" />
                        </form>
                    </div>
                `;
                document.body.insertAdjacentHTML("beforeend", html);
    }).catch(console.error);


}

rss_developpez("https://www.developpez.com/index/rss");
rss_tech2tech("https://api.rss2json.com/v1/api.json?rss_url=" +"https://www.tech2tech.fr/feed/");
rss_infoq("https://api.rss2json.com/v1/api.json?rss_url=" + "https://feed.infoq.com/Programming-Languages/news/");


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  
function extractKeysFromArrayBuffer(subscription){
    const keyArrayBuffer = subscription.getKey('p256dh');
    const authArrayBuffer = subscription.getKey('auth');
    const p256dh = btoa(String.fromCharCode.apply(null, new Uint8Array(keyArrayBuffer)));
    const auth = btoa(String.fromCharCode.apply(null, new Uint8Array(authArrayBuffer)));
    console.log('p256dh key', keyArrayBuffer, p256dh);
    console.log('auth key', authArrayBuffer, auth);
    
    console.log('endpoint :');
    console.dir(subscription.endpoint);
    console.log('p256dh key :', p256dh);
    console.log('auth key :', auth);
}  

// 3.2
if(navigator.serviceWorker) {
	// Enregistrement du service worker
    navigator.serviceWorker
        .register('sw.js')
        
        // 8.4 Récupération ou création d'une souscription auprès d'un push service
        .then(registration =>{
        
        	// tentative d'obtention d'une souscription
            // public vapid key générée par web-push, en prod appel d'api via fetch plutôt que static
            const publicKey = "BG7MuwZWvuZnE2Su2tPBZxCBRzB0A2bvqaFtj92JwhoHfMPgQYSPms82NKWAlXVHiPOqbtoGuqD6sKfpwhCOT38";
            registration.pushManager.getSubscription().then(subscription => {
            
            	// Déjà une souscription, on l'affiche
                if(subscription){
                    console.log("subscription", subscription);
                    // Extraction des données permettant ensuite l'envoi de notification
                    extractKeysFromArrayBuffer(subscription);
                    return subscription;
                }
                
                // Pas de souscription
                else{
                    // demande de souscription (clef convertie en buffer pour faire la demande)
                    const convertedKey = urlBase64ToUint8Array(publicKey);
                    return registration.pushManager.subscribe({
                        userVisibleOnly: true, // accord de confiance
                        applicationServerKey: convertedKey
                    })
                    .then(newSubscription => {
                    	// Affiche le résultat pour vérifier
                        console.log('newSubscription', newSubscription);
                        extractKeysFromArrayBuffer(newSubscription);
                        return newSubscription;
                    })

                }
            })
        })
        .catch(err => console.error('service worker NON enregistré', err));
}
