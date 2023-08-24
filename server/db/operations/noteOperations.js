const logger = require("../../utils/logger");
const noteModel = require("../models/noteModel");
const userOperations = require("./userOperations");

module.exports = {
    async create(note){
        logger.debug("notesOperations create");
        try{
            const newNote = await noteModel.create(note);
            const user = await userOperations.addNote(newNote);
            return newNote;
        }catch(e){
            return e;
        }
    },
    async read(id){
        logger.debug("notesOperations read");
        try{
            const note = await noteModel.findById(id);
            return note;
        }catch(e){
            return e;
        }
    },
    async update({id, note}){
        logger.debug("notesOperations update");
        try{
            const prevNote = await noteModel.findByIdAndUpdate(id, note);
            return prevNote;
        }catch(e){
            return e;
        }
    },
    async delete(id){
        logger.debug("notesOperations delete");
        try{
            const deletedNote = await noteModel.findByIdAndDelete(id);
            const user = await userOperations.deleteNote(deletedNote);
            return deletedNote;
        }catch(e){
            return e;
        }
    }
}