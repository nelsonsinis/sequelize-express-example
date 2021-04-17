const { logger } = require('lowe');
const app = require('./src/config/application');

app.listen(process.env.PORT || 3000, () =>
  logger.info(`Server is running on port: ${process.env.PORT || 3000}`));
