import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import config from '../../config';

fs.readdirSync(path.join(__dirname, '../models')).forEach((file) => {
  require(path.join(__dirname, '../models/', file));
});

export default new Promise((resolve, reject) => {
  mongoose.connect(config.uriMongo, (err) => {
    if (err) return reject(err);
    console.log('Mongo is connected');
    return resolve();
  });
});
