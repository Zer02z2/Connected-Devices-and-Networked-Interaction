#include <WiFiNINA.h>
#include <Arduino_LSM6DS3.h>

const int yellow = 2;
const int blue = 3;
const int red = 4;
const int green = 12;

int lastYellow = 0;
int lastBlue= 0;
int lastRed = 0;
int lastGreen = 0;

bool ready = true;

WiFiClient client;

const char server[] = "10.23.10.119"; //local IP address of receiver device goes here
const int portNum = 2222; //desired port # goes here. Make sure the receiver is listening on the same port!

//be sure to remove WiFi network details before uploading this code!
const char WIFI_SSID[] = "sandbox370"; //WiFi network name goes here
const char WIFI_PASS[] = "+s0a+s03!2gether?"; //WiFi password goes here

void setup() {
  Serial.begin(9600);
  //retry connection until WiFi is connected successfully

  //init IMU
  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");

    while (1);
  }

  //init wifi
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Attempting to connect to SSID: ");
    // Attempt connection to WPA/WPA2 network.
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    delay(3000);
  }
  Serial.println("connected!");
}

void loop() {
  //connect to client if disconnected, or send TCP message if conected
  if (!client.connected()) {
    Serial.println("connecting");
    client.connect(server, portNum);
    delay(1000);
    return;
  } else {
    //add something more interesting here
    Serial.println("sending TCP message");

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

    client.print(x);
    client.print(",");
    client.println(message);
    // client.println(data);
    delay(100);
  }
}

