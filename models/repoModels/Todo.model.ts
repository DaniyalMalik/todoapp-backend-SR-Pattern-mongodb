const mongoose = require('mongoose'),
  MongooseSchema = new mongoose.Schema(
    {
      name: { type: String, default: '' },
      description: { type: String, default: '' },
      done: { type: String, default: '' },
    },
    { timestamps: true },
  );

module.exports = mongoose.model('Todo', MongooseSchema, 'Todo');
