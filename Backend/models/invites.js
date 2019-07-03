const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inviteSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'pending'
  }
});

module.exports = {
  Invite: mongoose.model('invite', inviteSchema)
};
