// rollbar.config.js
export default {
    accessToken: import.meta.env.VITE_ROLLBAR_KEY,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: import.meta.env.VITE_NINEPANELS_ENV
    },
  };