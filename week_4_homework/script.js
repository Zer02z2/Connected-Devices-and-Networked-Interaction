const broker = "public.cloud.shiftr.io";
const mqtt_port = 443; //we use HTTPS port 443 when creating a browser-based MQTT client

const mqtt_user = "public";
const mqtt_pass = "public";
const clientID = "ZZZZZZZ";

//the topic incoming messages should be sent to
const subTopic = "ZZZ's brightness";

const MQTT = new Paho.MQTT.Client(broker, mqtt_port, clientID);
const sendButton = document.querySelector('#sendMQTTButton');

sendButton.addEventListener('click', () => {
    sendMQTTMessage('ZZZ\'s brightness', 'clicked');
});

MQTT.connect({
    onSuccess: mqttConnected, // callback function for successful connection
    userName: mqtt_user, // username
    password: mqtt_pass, // password
    useSSL: true
});

//called on successful connection - enables the MQTT message button
//you should subscribe to topics in here as well
function mqttConnected() {
    MQTT.subscribe(subTopic);
    MQTT.onMessageArrived = handleMQTTMessage; //callback function for incoming messages
    console.log("MQTT connected successfully.");
    document.querySelector("#sendMQTTButton").disabled = false;
}

//send an MQTT message with a defined topic and payload
function sendMQTTMessage(topic, payload) {
    const newMessage = new Paho.MQTT.Message(payload);
    newMessage.destinationName = topic;
    MQTT.send(newMessage);
}

function handleMQTTMessage(msg) {
    document.querySelector("#inTopic").innerHTML = `Topic: ${msg.destinationName}`;
    document.querySelector("#inPayload").innerHTML = msg.payloadString;
}