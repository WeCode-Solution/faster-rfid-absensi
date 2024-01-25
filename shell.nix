{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell rec {
  name = "faster-rfid-absensi";
  packages = with pkgs; [
    nodejs_21 php php82Packages.composer php82Extensions.pdo php82Extensions.xml
    python3 python311Packages.python-decouple
  ];
}
