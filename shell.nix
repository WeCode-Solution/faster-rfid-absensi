{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell rec {
  name = "faster-rfid-absensi";
  packages = with pkgs; [
    dotnet-sdk_8 php php82Packages.composer php82Extensions.pdo php82Extensions.xml
  ];

  dotnet_root = builtins.toString pkgs.dotnet-sdk_8;
  shellHook = ''
    cd ./cache_farm
    if [ -f ./.env ]; then
      echo "[HOOK] Import environment variable."
      set -o allexport && source ./.env && set +o allexport
    fi
    echo "[HOOK] Set dotnet root"
    export DOTNET_ROOT=${dotnet_root}
  '';
}
