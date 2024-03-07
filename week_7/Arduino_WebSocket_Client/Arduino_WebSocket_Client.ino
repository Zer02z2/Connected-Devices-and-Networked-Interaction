#include <ArduinoHttpClient.h>
#include <WiFiNINA.h>
#include "arduino_secrets.h"

///////please enter your sensitive data in the Secret tab/arduino_secrets.h
/////// WiFi Settings ///////
char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;

char serverAddress[] = "142.93.244.227";  // server IP address
int port = 1880; //port server is listening for socket requests on
const char socket_endpoint[] = "/device1";

WiFiClient wifi;
WebSocketClient client = WebSocketClient(wifi, serverAddress, port);

void setup() {
  Serial.begin(9600);
  
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Attempting to connect to SSID: ");
    // Attempt connection to WPA/WPA2 network.
    WiFi.begin(ssid, pass);
    delay(1000);
  }

  Serial.println("WiFi connected.");
  client.begin(socket_endpoint);

}

void loop() {
  Serial.println("starting WebSocket client");

  while (!client.connected()) {
    Serial.println("connecting to socket.");
    client.begin(socket_endpoint);
    delay(500);
  }

  while (client.connected()) {
    Serial.print("Sending hello ");
    

    // send a hello #
    client.beginMessage(TYPE_TEXT);
    client.print("hello");
    client.endMessage();

    // check if a message is available to be received
    int messageSize = client.parseMessage();

    if (messageSize > 0) {
      Serial.println("Received a message:");
      Serial.println(client.readString());
    }
  }

  Serial.println("disconnected");
}
