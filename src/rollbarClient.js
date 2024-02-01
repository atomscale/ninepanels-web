import Rollbar from 'rollbar';
// import config from '../rollbar.config';

let rollbar

if (import.meta.env.VITE_NINEPANELS_ENV !== 'FEATURE') {
    rollbar = new Rollbar(
        {
            accessToken: import.meta.env.VITE_ROLLBAR_KEY,
            captureUncaught: true,
            captureUnhandledRejections: true,
            payload: {
                environment: import.meta.env.VITE_NINEPANELS_ENV
            }
        }
    );
} else {
    // console.log("rollbar deactivated for feature")
    rollbar =
        {
            log: ()  => {},
            error: () => {},
            warn: () => {},
            info: () => {},
            critical: () => {},
        }
}

export default rollbar;