#include <ArduinoMqttClient.h>
#include <WiFiNINA.h>

WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);

const int lightPin = A7;

const char ssid[] = "sandbox370";
const char pass[] = "+s0a+s03!2gether?";

//MQTT broker info: url and port (1883 default for MQTT)
const char broker[] = "public.cloud.shiftr.io";
const int  port = 1883;

//if needed: broker authentication credentials
const char mqtt_user[] = "public";
const char mqtt_pass[] = "public";

//define the topic a message will be automatically sent to
//when this device accidentally disconnects
const char willTopic[] = "zzz/status";
const String willPayload = "offline";

const char pubTopic[] = "ZZZ's brightness";

const int sendInterval = 1000;

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial);
  // attempt to connect to WiFi network:
  Serial.print("Attempting to connect to WPA SSID: ");
  Serial.println(ssid);
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }

  Serial.println("You're connected to the network");
  Serial.println();

  // You can provide a unique client ID, if not set the library uses Arduino-millis()
  // Each client must have a unique client ID
   mqttClient.setId("ZZZ");

  // You can provide a username and password for authentication
   mqttClient.setUsernamePassword(mqtt_user, mqtt_pass);

  // set a will message, used by the broker when the connection dies unexpectedly
  // you must know the size of the message beforehand, and it must be set before connecting
  bool willRetain = true;
  int willQos = 1;

  // mqttClient.beginWill(willTopic, willPayload.length(), willRetain, willQos);
  // mqttClient.print(willPayload);
  // mqttClient.endWill();

  Serial.print("Attempting to connect to the MQTT broker: ");
  Serial.println(broker);

  while (!mqttClient.connect(broker, port)) {
    Serial.print("MQTT connection failed! Error code = ");
    Serial.println(mqttClient.connectError());

    delay(2000);
  }

  Serial.println("You're connected to the MQTT broker!");
  Serial.println();
}

void loop() {

  int brightness = analogRead(lightPin);

    if (millis() % sendInterval < 10) {
      mqttClient.beginMessage(pubTopic);
      mqttClient.print(millis());
      mqttClient.print(",");
      mqttClient.print(brightness);
      mqttClient.endMessage();
      delay(10);
  }
  //mqttClient.poll();
}
