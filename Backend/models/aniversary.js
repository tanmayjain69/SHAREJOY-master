const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AniversarySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  partnername: {
    type: String,
    required: true
  },
  partnersurname: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date : {
    type:String,
    required:true
  },
  startTimehr : {
    type:String,
    required:true
  },
  startTimemn : {
    type:String,
    required:true
  },
  endTimehr : {
    type:String,
    required:true
  },
  endTimemn : {
    type:String,
    required:true
  },
  createdBy : {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  address : {
    type:String,
    required:true
  },
  invites : {
    users : [
       {
         id : {type:Schema.Types.ObjectId,ref:'User',required:true},
         name :{type:String,ref:'User',required:true}
       }
    ]
  }
});

module.exports = {
  aniversary: mongoose.model('aniversary', AniversarySchema)
};
