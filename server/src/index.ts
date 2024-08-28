// Import Http Server containing the app
import appServer from "./app";
// DB
import dbHandler from "./database"

// Ports
const APP_PORT = 4001;
dbHandler.connect().then(() => {
    appServer?.listen(APP_PORT, (): void => {
        console.log(`Server listening on port ${APP_PORT}`);
    });
})
