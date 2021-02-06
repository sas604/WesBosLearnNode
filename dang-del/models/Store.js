const mongoose = require('mongoose');
// tells mongoose to use native promises
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Plese enter a store name!',
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
});

storeSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from runnig
  }
  this.slug = slug(this.name);
  next();
  // TODO: make more resiliant so slugs are unique
});

module.exports = mongoose.model('Store', storeSchema);
