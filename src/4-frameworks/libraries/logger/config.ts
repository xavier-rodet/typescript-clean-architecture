export const config = {
  key: process.env.LOGGER_API_KEY || '',
  options: {
    app: process.env.APP_NAME || '',
    env: process.env.ENV || '',
  },
};
