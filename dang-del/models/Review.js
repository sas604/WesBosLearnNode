const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You mast supply an author!',
  },
  store: {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
    required: 'You mast supply a Store',
  },
  text: {
    type: String,
    required: 'You mast supply store!',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

function autopopulate(next) {
  this.populate('author');
  next();
}

reviewSchema.pre('find', autopopulate);
reviewSchema.pre('findOne', autopopulate);
module.exports = mongoose.model('Review', reviewSchema);
