export default () => ({
  port: 3000,
  database: {
    mongoConnectionString: process.env.MONGODB_CONNECTION_STRING,
  },
  api: {
    key: process.env.API_KEY,
  },
});
