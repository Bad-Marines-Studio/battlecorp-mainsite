import axios from 'axios';
import dotenv from 'dotenv';
import { readFileSync, writeFileSync, existsSync, rename } from 'fs';
import { join, dirname } from 'path';
import { execSync, spawn } from "child_process";
import { fileURLToPath } from 'url';

dotenv.config() // load env vars from .env
dotenv.config({ path: `.env.local`, override: true }); // override from .local

const OUTPUT_PACKAGE_NAME = 'bch-react-rest-client';
const OUTPUT_PACKAGE_VERSION = '1.0';
const WORKING_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const API_JSON_URL = 'http://localhost:3000/api-json';
const API_JSON_FILE_PATH = join(WORKING_DIRECTORY, 'lib/api-json.json');
const SWAGGER_CODEGEN_DOCKER = join(WORKING_DIRECTORY, 'swagger_codegen_docker.bat');

export async function GenerateBchReactRestClient(force: boolean = false) {

    // Ignore if not in dev mode
    if (process.env.VITE_ENV != 'development') {
        console.log(`Not in development mode / ignoring auto generation, VITE_ENV is "${process.env.VITE_ENV}"`);
        return;
    } else {
        console.log('Launching swagger prestart');
    }

    // Check if localhost backend json spec is accessible
    let latestApiJson: string = "";
    await axios.get<string>(
        API_JSON_URL,
        {
            headers: {
                Accept: 'application/json',
            },
        },
    ).then(response => {
        if (response.status == 200) {
            console.log('Latest api-json file received.')
            latestApiJson = response.data;
        }
    }).catch(error => {
        console.warn(`Could not read api-json at ${API_JSON_URL}, ${error}`);
        console.log('Please launch local horizon-back server to enable client auto regeneration');
        return;
    });

    if (latestApiJson != "") {
        // Compare with our current json file if it exists
        let currentApiJson = existsSync(API_JSON_FILE_PATH) ? readFileSync(API_JSON_FILE_PATH, 'utf8') : "";
        try {
            currentApiJson = JSON.parse(currentApiJson);
        } catch (err) {
            console.warn('Could not parse local json, ignoring');
            currentApiJson = "";
        }

        if (force || !currentApiJson || JSON.stringify(currentApiJson) !== JSON.stringify(latestApiJson)) {
            // Launch compilation
            console.log('Launching codegen batch file : ' + SWAGGER_CODEGEN_DOCKER);

            var ls = spawn(SWAGGER_CODEGEN_DOCKER, [], { shell: true, cwd: WORKING_DIRECTORY });
            ls.stdout.on('data', (data) => {
                console.log(`${data}`);
            });
            ls.stderr.on('data', (data) => {
                console.log(`${data}`);
            });
            ls.on('close', (code) => {
                if (code == 0) {
                    console.log('Finished executing codegen batch file');
                    const libPackageFile = join(WORKING_DIRECTORY, 'lib/package.json');
                    if (existsSync(libPackageFile)) {

                        // Setting npm name and version in lib/package.json
                        const libPackageFileContent = readFileSync(libPackageFile, 'utf8');
                        let jsonified = JSON.parse(libPackageFileContent);
                        jsonified.name = OUTPUT_PACKAGE_NAME;
                        jsonified.version = OUTPUT_PACKAGE_VERSION;
                        writeFileSync(libPackageFile, JSON.stringify(jsonified, null, 2));

                        // Npm build
                        console.log('Building the generated code');
                        execSync('npm run build', { cwd: join(WORKING_DIRECTORY, 'lib') });

                        // Npm pack
                        console.log('Packaging the generated code');
                        execSync('npm pack', { cwd: join(WORKING_DIRECTORY, 'lib') });

                        // Checking correct npm pack and moving tarball file to packages folder
                        const libTarballFile = join(WORKING_DIRECTORY, `lib/${OUTPUT_PACKAGE_NAME}-${OUTPUT_PACKAGE_VERSION}.tgz`);
                        const destTarballFile = join(WORKING_DIRECTORY, `packages/${OUTPUT_PACKAGE_NAME}-${OUTPUT_PACKAGE_VERSION}.tgz`);
                        if (existsSync(libTarballFile)) {
                            rename(libTarballFile, destTarballFile, function (err) {
                                if (err) throw err;
                            })
                        } else {
                            console.error('Could not find packed tarball');
                            return;                            
                        }

                        // Npm installation
                        console.log('Uninstalling previous package');
                        execSync(`npm uninstall @bad-marines-studio/${OUTPUT_PACKAGE_NAME}`);
                        console.log('Installing new package');
                        execSync(`npm install @bad-marines-studio/${OUTPUT_PACKAGE_NAME}@file:/./swagger/packages/${OUTPUT_PACKAGE_NAME}-${OUTPUT_PACKAGE_VERSION}.tgz`);

                        // Store api-json
                        console.log('Storing latest api-json file for later comparison');
                        writeFileSync(API_JSON_FILE_PATH, JSON.stringify(latestApiJson), { flag: 'w', encoding: 'utf8' });

                        console.log('BCH Api client regenerated and installed, happy coding.');
                    } else {
                        console.error('Generated package.json file not found');
                        return;
                    }
                }
            });
        } else {
            console.log('Your bch api client is up to date');
            return;
        }
    }
}
