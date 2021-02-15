const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default:new Date().toLocaleString()
  },
  due_date:{
    type:String,
    default:new Date(+new Date() + 7*24*60*60*1000).toLocaleString()
  }
});

module.exports = mongoose.model('Note', NoteSchema);
