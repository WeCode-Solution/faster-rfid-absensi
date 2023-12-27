{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell rec {
    name = "indev_env";
    packages = with pkgs; [
        dotnet-sdk_8
        php
        php82Packages.composer
        php82Extensions.pdo
        php82Extensions.xml
    ];

    # Pointing Dotnet Root
    dotnetRoot = builtins.toString pkgs.dotnet-sdk_8;

    shellHook = ''
        # Composer Setup
        cd ./webserver
        echo "[HOOK] Restore composer."
        composer install
        if [ ! -f ./.env ]; then
            echo "[HOOK] Generate .env for first time."
            cp .env.example .env
            php artisan key:generate
        fi


        # .NET Setup
        cd ../cache_farm
        echo "[HOOK] Restore all dotnet package."
        dotnet restore
        if [ -f ./.env ]; then
            echo "[HOOK] Import environment variable."
            set -o allexport && source ./.env && set +o allexport
        fi
        echo "[HOOK] Set Dotnet root"
        export DOTNET_ROOT=${dotnetRoot}

        cd ..
        echo "[HOOK] Done!"
    '';
}
