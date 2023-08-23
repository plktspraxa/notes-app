const noteModel = require("../models/noteModel");
const userOperations = require("./userOperations");

module.exports = {
    async create(note){
        try{
            const newNote = await noteModel.create(note);
            const user = await userOperations.addNote(newNote);
            return newNote;
        }catch(e){
            return e;
        }
    },
    async read(id){
        try{
            const note = await noteModel.findById(id);
            return note;
        }catch(e){
            return e;
        }
    },
    async update({id, note}){
        try{
            console.log(note);
            const prevNote = await noteModel.findByIdAndUpdate(id, note);
            return prevNote;
        }catch(e){
            return e;
        }
    },
    async delete(id){
        try{
            const deletedNote = await noteModel.findByIdAndDelete(id);
            return deletedNote;
        }catch(e){
            return e;
        }
    }
}