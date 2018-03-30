import mongoose from 'mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';

import chalk from 'chalk';
import Settings from '../../setting.json';
import logger from '../logger';

export default app => {
  mongoose.Promise = global.Promise;

  const db = mongoose.connection;
  mongoose.plugin(mongodbErrorHandler);

  db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
  });
  db.on('connected', function() {
    console.log('MongoDB connected!');
  });
  db.once('open', function() {
    logger.info('Connected to mongoose', chalk.green('✓'));
  });
  db.on('reconnected', function() {
    console.log('MongoDB reconnected!');
  });
  db.on('disconnected', function() {
    console.log('MongoDB disconnected!');
    mongoose.connect(Settings.mongodb.url, { auto_reconnect: true });
  });

  mongoose.connect(Settings.mongodb.url, { auto_reconnect: true });
};
