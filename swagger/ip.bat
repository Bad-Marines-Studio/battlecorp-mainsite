@echo off
setlocal enabledelayedexpansion

rem Run ipconfig command to retrieve IP address information
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"Adresse IPv4"') do (
    set "ip=%%a"
    set ip=!ip:~1!
    if "!ip!" neq "" (
        rem Check if IP address belongs to the local network
        if "!ip:~0,10!"=="192.168.1." (
            echo Your local network IP address: !ip!
            exit /b
        )
    )
)

echo Unable to retrieve local network IP address.
