const { SchemaTypes } = require("mongoose");
const connection = require("../connection");
const Schema = connection.Schema;

const userSchema = new Schema({ 
  name: {type: String, unique: true},
  email: {type: String, unique: true},
  password: {type: String, unique: true},
  notes: [{type: SchemaTypes.ObjectId, ref: "notes"}],
  token: {type: String}
});

const userModel = connection.model("users", userSchema);
module.exports = userModel;
