const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  term: String
}, {
  timestamps: {
    createdAt: 'when',
    updatedAt: false
  }
});

mongoose.model('History', HistorySchema);
