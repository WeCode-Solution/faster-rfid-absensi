#include <LiquidCrystal_I2C.h>
#include <SPI.h>
#include <MFRC522.h>
#include <map>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>

#define SS_PIN  5  // ESP32 pin GPIO5 
#define RST_PIN 27 // ESP32 pin GPIO27 
int totalColumns = 16;
int totalRows = 2;
String wifi_ssid = "ssid";
String wifi_pass = "pass";
String uri_target = "http://localhost:3000/attendance";

LiquidCrystal_I2C lcd(0x27, totalColumns, totalRows);  
MFRC522 rfid(SS_PIN, RST_PIN);
std::map<String, String> card_list = {
    { "123184317", "2b3a42160316cc730eb31d3238dab6cd289ead95da4fd279e262431d94d1c40b" }
};

void setup(){
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();
  SPI.begin(); // init SPI bus
  rfid.PCD_Init(); // init MFRC522

  WiFi.mode(WIFI_STA);
  WiFi.begin(wifi_ssid, wifi_pass);
  while (WiFi.status() != WL_CONNECTED) {
    lcd.setCursor(1, 0);
    lcd.print("Connecting to");
    lcd.setCursor(4, 1);
    lcd.print("Wifi...");
  }
  lcd.clear();
  lcd.setCursor(3, 0);
  lcd.print("Connected!");
  delay(1000);
  lcd.clear();
}

void loop(){
  lcd.setCursor(0, 0);
  lcd.print("Selamat datang!");
  lcd.setCursor(0, 1);
  lcd.print("Tap kartu anda!");
  
  if (!rfid.PICC_IsNewCardPresent()) return;
  if (!rfid.PICC_ReadCardSerial()) return;

  // print UID in Serial Monitor in the hex format
  String rfidUUID = "";
  for (int i = 0; i < rfid.uid.size; i++) {
    rfidUUID += rfid.uid.uidByte[i];
  }

  lcd.clear();
  auto it = card_list.find(rfidUUID);
  if (it == card_list.end()) {
    lcd.setCursor(0, 0);
    lcd.print("Tidak valid!");
    delay(4000);
    return;
  }

  lcd.setCursor(0, 0);
  lcd.print("Tunggu");
  lcd.setCursor(0, 1);
  lcd.print("Sebentar");
  
  rfid.PICC_HaltA();
  HTTPClient http;
  http.begin(uri_target);
  http.addHeader("Content-Type", "application/json");
  int respCode = http.POST("{\"data\":\"" + card_list[rfidUUID] + "\"}");

  lcd.clear();
  if (respCode < 0) {
    lcd.setCursor(0, 0);
    lcd.print("Ada error");
    lcd.setCursor(0, 1);
    lcd.print("terjadi!");
    delay(4000);
    http.end();
    return;
  }
  
  JSONVar resp = JSON.parse(http.getString());
  if (JSON.typeof(resp) == "undefined") {
    lcd.setCursor(0, 0);
    lcd.print("Ada error");
    lcd.setCursor(0, 1);
    lcd.print("terjadi!");
    delay(4000);
    http.end();
    return;
  }
  String nick = resp["data"]["nickName"];

  lcd.setCursor(0, 0);
  lcd.print("Hi " + nick);
  lcd.setCursor(0, 1);
  lcd.print("Selamat datang!");
  delay(4000);
  http.end();
}
