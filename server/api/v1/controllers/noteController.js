const noteOperations = require('../../../db/operations/noteOperations');
const mongoose = require('mongoose');
const userOperations = require('../../../db/operations/userOperations');
//pino logoging tool
module.exports = {
    async add(req, res){
        const userId = new mongoose.Types.ObjectId(req.userId)
        const note = {...req.body, userId: userId};
        const newNote = await noteOperations.create(note);
        if(newNote && newNote._id){
            res.status(200).json({
                note: newNote,
                message: 'added'
            })
        }else{
            res.status(500).json({
                message: 'not added'
            })
        }
    },
    async read(req, res){
        try{
            const obj = req.body;
            const doc = await noteOperations.read(req.params.id);
            res.status(200).json({
                data: doc
            })
        }catch(e){
            res.status(404).json({
                error: e
            })
        }
    },
    async readAll(req, res){
        const userId = new mongoose.Types.ObjectId(req.userId);
        const obj = req.body;
        const user = await userOperations.getNotes(userId);
        console.log(user);
        res.status(200).json({
            notes: user.notes
        })
    },
    async update(req, res){
        try{
            const obj = req.body;
            const id = new mongoose.Types.ObjectId(req.params.id);
            const doc = await noteOperations.update({id: id, note: obj});
            if(doc){
                res.status(200).json({
                    data: doc
                })
            } else {
                res.status(404).json({
                    data: e
                })
            }
        }catch(e){
            res.status(500).json({
                error: e
            })
        }
    },
    async delete(req, res){
        try{
            const obj = req.body;
            const doc = await noteOperations.delete(req.params.id);
            res.status(200).json({
                data: doc
            })
        }catch(e){
            res.status(404).json({
                error: e
            })
        }
    }
}