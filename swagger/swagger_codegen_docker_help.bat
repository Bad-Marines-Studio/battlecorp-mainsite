@ECHO off
SETLOCAL ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION

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

ECHO Running codegen help...
DOCKER run --rm --network host -v "%CD%:/gen" %SWAGGER_CODEGEN_IMAGE% config-help -l typescript-axios

EXIT /B
