const logger = require("../../utils/logger");
const userModel = require("../models/userModel");

module.exports = {
    async create(obj){
        logger.debug("userOperations create");
        try{
            const doc = await userModel.create(obj);
            return doc;
        }catch(e){
            return e;
        }
    },
    async read(user){
        logger.debug("userOperations read");
        try{
            const doc = await userModel.findOne({email: user.email});
            return doc;
        }catch(e){
            return e;
        }
    },
    async update(obj){
        logger.debug("userOperations update");
        try{
            const doc = await userModel.findOneAndUpdate({email: user.email}, obj);
            return doc;
        }catch(e){
            return e;
        }
    },
    async delete(obj){
        logger.debug("userOperations delete");
        try{
            const name = obj.name;
            const doc = await userModel.findOneAndDelete({email: user.email});
            return doc;
        }catch(e){
            return e;
        }
    },
    async deleteNote(note){
        logger.debug("userOperations deleteNote");
        try{
            const userId = note.userId;
            const noteId = note._id;
            const user = await userModel.findOneAndUpdate({_id: userId},{$pull:{notes: {_id:noteId}}})
            return user;
        } catch(e) {

        }
    },
    async addNote(note){
        logger.debug("userOperations addNote");
        try{
            const userId = note.userId;
            const noteId = note._id;
            const user = await userModel.findById(userId).exec();
            user.notes.push(noteId);
            await user.save();
            return user;
        }catch(e){
            return e;
        }
    },
    async getNotes(userId){
        logger.debug("userOperations getNotes");
        try{
            const user = await userModel.findById(userId).populate('notes');
            return user;
        }catch(e){
            return e;
        }
    }
}