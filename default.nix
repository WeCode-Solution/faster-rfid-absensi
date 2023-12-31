let
  pkgs = import <nixpkgs> {};

  cache_farm = rec {
    root = builtins.toString pkgs.dotnet-sdk_8;
    packages = with pkgs; [
      dotnet-sdk_8
    ];
    install = ''
      # .NET setup
      cd ./cache_farm
      echo "[HOOK] restore all dotnet package."
      dotnet restore
    '';
    hook = ''
      cd ./cache_farm
      if [ -f ./.env ]; then
        echo "[HOOK] Import environment variable."
        set -o allexport && source ./.env && set +o allexport
      fi
      echo "[HOOK] Set dotnet root"
      export DOTNET_ROOT=${root}
      cd ..
    '';
    serve = "";
  };

  webserver = {
    packages = with pkgs; [
      php
      php82Packages.composer
      php82Extensions.pdo
      php82Extensions.xml
    ];
    install = ''
      # Composer Setup
      cd ./webserver
      echo "[HOOK] Restore composer."
      composer install
    '';
    serve = ''
      cd ./webserver
      if [ ! -f ./.env ]; then
        echo "[HOOK] Generate .env for first time."
        cp .env.example .env
      fi
      php artisan key:generate
      php artisan serve --host=0.0.0.0 --port=80
    '';
  };


  hook = {
    shellHook ? "",
    packages ? cache_farm.packages ++ webserver.packages
  }: pkgs.mkShell {
    name = "faster-rfid-absensi";
    inherit packages shellHook;
  };
in
  {
    dev = hook {
      shellHook = ''
        set -e
        ${cache_farm.hook}
        echo [HOOK] Done!
      '';
    };

    install = {
      webserver = hook { shellHook = ''
        set -e
        ${webserver.install}
        exit
      ''; };
      cache_farm = hook { shellHook = ''
        set -e
        ${cache_farm.install}
        exit
      ''; };
    };

    serve = {
      webserver = hook { shellHook = ''
        set -e
        ${webserver.serve}
        exit
      ''; };
      cache_farm = hook { shellHook = ''
        set -e
        ${cache_farm.hook}
        ${cache_farm.serve}
        exit
      ''; };
    };

  }
