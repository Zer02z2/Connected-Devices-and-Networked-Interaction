#include <WiFiNINA.h>
#include <Arduino_LSM6DS3.h>
#include "config.h"

const int yellow = 2;
const int blue = 3;
const int red = 4;
const int green = 12;

int lastYellow = 0;
int lastBlue= 0;
int lastRed = 0;
int lastGreen = 0;

bool ready = true;

WiFiUDP udpClient;

//configure your WiFi information inside config.h file

const char server[] = "10.23.10.119"; //local IP address of receiver device goes here
const int port = 2222; //desired port # goes here. Make sure the receiver is listening on the same port!


//the port OTHER devices should use when sending to this one
const int localPort = 5000;

void setup() {
  Serial.begin(9600);
  
    if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");

    while (1);
  }

  //retry connection until WiFi is connected successfully
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Attempting to connect to SSID: ");
    // Attempt connection to WPA/WPA2 network.
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    delay(500);
  }
  Serial.println("connected!");

  udpClient.begin(localPort);
}

char messageBuffer[256];

void loop() {
  if (millis()%100 < 10) {    
    //add something more interesting here
    udpClient.beginPacket(server, port);

    float x, y, z;
    int thisYellow = digitalRead(yellow);
    int thisBlue = digitalRead(blue);
    int thisRed = digitalRead(red);
    int thisGreen = digitalRead(green);
    String message = "none";

    if (IMU.accelerationAvailable()) {
      IMU.readAcceleration(x, y, z);
    }

    if (ready == true) {

      if (thisYellow == 1) {
        message = "yellow";
        ready = false;
      }
      else if (thisBlue == 1) {
        message = "blue";
        ready = false;
      }
      else if (thisRed == 1) {
        message = "red";
        ready = false;
      }
      else if (thisGreen == 1) {
        message = "green";
        ready = false;
      }
    }

    if (thisYellow == 0 && thisBlue == 0 && thisRed == 0 && thisGreen == 0) ready = true;

    Serial.println("sending Udp");
    udpClient.print(x);
    udpClient.print(",");
    udpClient.println(message);
    delay(10);
  }

  //check for incoming packets
  if (udpClient.parsePacket()) {
    udpClient.read(messageBuffer, 255);
    Serial.print("UDP received: ");
    Serial.println(atoi(messageBuffer));
    digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
  }
  
}