const userModel = require("../models/userModel");

module.exports = {
    async create(obj){
        try{
            const doc = await userModel.create(obj);
            return doc;
        }catch(e){
            return e;
        }
    },
    async read(user){
        try{
            const doc = await userModel.findOne({email: user.email});
            return doc;
        }catch(e){
            return e;
        }
    },
    async update(obj){
        try{
            const doc = await userModel.findOneAndUpdate({email: user.email}, obj);
            return doc;
        }catch(e){
            return e;
        }
    },
    async delete(obj){
        try{
            const name = obj.name;
            const doc = await userModel.findOneAndDelete({email: user.email});
            return doc;
        }catch(e){
            return e;
        }
    },
    async addNote(note){
        try{
            const userId = note.userId;
            const noteId = note._id;
            const user = await userModel.findById(userId).exec();
            await user.notes.push(noteId);
            await user.save();
            return user;
        }catch(e){
            return e;
        }
    },
    async getNotes(userId){
        try{
            const user = await userModel.findById(userId).populate('notes');
            return user;
        }catch(e){
            return e;
        }
    }
}