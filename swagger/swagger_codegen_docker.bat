@ECHO off
SETLOCAL ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION

REM Setting work folder
SET WORK_FOLDER=%~dp0

ECHO Launching docker swagger codegen in folder %WORK_FOLDER%

REM checking if docker is running
DOCKER ps 2>&1 | find /I /C "error" > NUL
IF %errorlevel% EQU 0 (
    ECHO IMPORTANT: Run DOCKER before you start this script!
    TITLE DOCKER NOT RUNNING
    REM TIMEOUT 5 /NOBREAK
	EXIT /B
)

REM This script requires a Docker environment
REM and swagger-codegen-cli-v3 from var image
SET SWAGGER_CODEGEN_IMAGE=swaggerapi/swagger-codegen-cli-v3:3.0.46
ECHO Pulling %SWAGGER_CODEGEN_IMAGE% image...
DOCKER pull %SWAGGER_CODEGEN_IMAGE%

REM Run ipconfig command to retrieve IP address information
FOR /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"Adresse IPv4"') do (
    SET "ip=%%a"
    SET ip=!ip:~1!
    IF "!ip!" neq "" (
        REM Check if IP address belongs to the local network
        IF "!ip:~0,10!"=="192.168.1." (
            ECHO Use Local network IP address from the container: !ip!
            BREAK
        )
    )
)

REM Remove leading and trailing spaces from the IP address
REM set "ip=!ip:~1!"

REM Set the path to the .json file
REM Note that for localhost access, you need to use the host.docker.internal address
SET APIJSONURL=http://%ip%%:3000/api-json
ECHO Use Local network IP address for the container: %APIJSONURL%

REM set output folder path
SET OUTPUT_PATH=%WORK_FOLDER%lib
REM delete the output folder if it exists
IF EXIST %OUTPUT_PATH% (
    RMDIR /q /s %OUTPUT_PATH%
)
MKDIR %OUTPUT_PATH%

REM Run the codegen
REM SET APIS=Users,Authentication
REM Add -Dapis=%APIS% when we figure out how to get it to work!
REM Only generate the following APIs / Not working for now
REM Also -c config file does not seem to work atm ...
ECHO Running codegen...
DOCKER run --rm --network host -v "%CD%:/gen" %SWAGGER_CODEGEN_IMAGE% generate ^
    -i %APIJSONURL% ^
    -l typescript-axios ^
    -o "/gen/lib" ^
    -c "/gen/swagger-codegen_config.json"

ECHO Done generating swagger client
REM TIMEOUT /t 1 /nobreak >nul
REM PAUSE
EXIT /B
