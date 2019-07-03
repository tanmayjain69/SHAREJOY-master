const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNo : {
    type:Number,
    required : true
  },
  image : {
    type:String,
    default:"Photo"
  },
  gender:{
    type:String,
  },
  dob:{
    type:Date,
  }
});

UserSchema.pre("save", async function (next) {
  if(!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 8)
  } catch (err) {
    return next(err);
  }
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  if(this.getUpdate().password === undefined) return next();
  try {
    this.getUpdate().password = await bcrypt.hash(this.getUpdate().password, 8)
  } catch (err) {
    return next(err);
  }
});

module.exports = {
  User: mongoose.model('User', UserSchema)
};
