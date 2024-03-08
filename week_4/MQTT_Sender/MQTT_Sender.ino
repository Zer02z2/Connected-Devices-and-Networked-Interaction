#include <ArduinoMqttClient.h>
#include <WiFiNINA.h>

WiFiClient wifi;
MqttClient mqtt(wifi);

//WiFi network info: ssid and password
const char wifi_ssid[] = "NewLabMember 2.4GHz Only";
const char wifi_pass[] = "!Welcome2NewLab!";

//MQTT broker info: url and port (1883 default for MQTT)
const char broker[] = "9.tcp.ngrok.io";
const int  port = 24004;

//if needed: broker authentication credentials
const char mqtt_user[] = "energy";
const char mqtt_pass[] = "password";

//the topic this device will publish messages to
const char pubTopic[] = "Zongze's_msg";

void setup() {
  Serial.begin(9600);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    WiFi.begin(wifi_ssid, wifi_pass);
    delay(1000);
  }
  Serial.println("\nWiFi connected!");

  //give your device any name, to use for identification
  mqtt.setId("Zongze's Arduino");

  //set mqtt credentials, if needed
  mqtt.setUsernamePassword(mqtt_user, mqtt_pass);

  if (!mqtt.connect(broker, port)) {
    //error codes
    //  -1: credentials rejected
    //  -2: can't connect to broker
    Serial.print("MQTT connection failed! Error code = ");
    Serial.println(mqtt.connectError());
    while (true) {}; //do nothing forever
  } else Serial.println("MQTT connected.");
}

const int sendInterval = 1000;
void loop() {

  if (millis() % sendInterval < 10) {
    mqtt.beginMessage(pubTopic);
    mqtt.print(millis());
    mqtt.endMessage();
    delay(10);
  }
  
}
