const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  original_url: {
    type: String, default: '', index: true
  },
  short_url: {
    type: String, default: '', unique: true, index: true
  }
});

mongoose.model('Url', UrlSchema);
