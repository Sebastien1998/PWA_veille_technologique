
const webPush = require('web-push');
const pushServerKeys = require('./pushServerKeys.json');
const pushClientSubscription = require('./pushClientSubscription.json');

function sendPush(){
    console.log(pushServerKeys, pushClientSubscription);
    webPush.setVapidDetails('mailto:mickael.lanfranchi2a@gmail.com', pushServerKeys.publicKey, pushServerKeys.privateKey);

    webPush.sendNotification(pushClientSubscription, 'Veille techno')
    .then(
        function(result){
            console.log("sendNotification SUCCESS", result);
        },
        function(err){
            console.log("sendNotification ERROR", err);
        }
    )
    .catch(
        function(err){
            console.log("sendNotification ERROR catch", err);
        }
    )
}

module.exports = sendPush;
