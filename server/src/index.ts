// Import Http Server containing the app
import appServer from "./app";

// Ports
const APP_PORT = 4001;

appServer?.listen(APP_PORT, (): void => {
    console.log(`Server listening on port ${APP_PORT}`);
});
