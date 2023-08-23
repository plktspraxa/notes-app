const { SchemaTypes } = require("mongoose");
const connection = require("../connection");
const Schema = connection.Schema;

const noteSchema = new Schema({ 
  title: {type: String, required: true},
  userId: {type: SchemaTypes.ObjectId, required: true, ref: "users"},
  content: {type: String},
}, {
    timestamps: true
});
noteSchema.index({title: 1, userId: 1}, {unique: true});

const noteModel = connection.model("notes", noteSchema);
module.exports = noteModel;