const noteOperations = require('../../../db/operations/noteOperations');
const mongoose = require('mongoose');
const userOperations = require('../../../db/operations/userOperations');
const logger = require('../../../utils/logger');

module.exports = {
    async add(req, res) {
        logger.debug('notesController add() start');
        try {
            const userId = new mongoose.Types.ObjectId(req.userId)
            const note = { ...req.body, userId: userId };
            const newNote = await noteOperations.create(note);
            if (newNote && newNote._id) {
                res.status(200).json({
                    note: newNote,
                    message: 'added'
                })
            } else {
                res.status(500).json({
                    message: 'not added'
                })
            }
        } catch (e) {
            res.status(500).json({
                message: 'not added'
            })
        }
    },
    async read(req, res) {
        logger.debug('notesController read() start');
        try {
            const obj = req.body;
            const doc = await noteOperations.read(req.params.id);
            res.status(200).json({
                data: doc
            })
        } catch (e) {
            res.status(404).json({
                error: e
            })
        }
    },
    async readAll(req, res) {
        logger.debug('notesController readAll() start');
        const userId = new mongoose.Types.ObjectId(req.userId);
        const obj = req.body;
        const user = await userOperations.getNotes(userId);
        res.status(200).json({
            notes: user.notes
        })
    },
    async update(req, res) {
        logger.debug('notesController update() start');
        try {
            const obj = req.body;
            const id = new mongoose.Types.ObjectId(req.params.id);
            const doc = await noteOperations.update({ id: id, note: obj });
            if (doc) {
                res.status(200).json({
                    data: doc
                })
            } else {
                res.status(404).json({
                    data: e
                })
            }
        } catch (e) {
            res.status(500).json({
                error: e
            })
        }
    },
    async delete(req, res) {
        logger.debug('notesController delete() start');
        try {
            const obj = req.body;
            const id = new mongoose.Types.ObjectId(req.params.id);
            const doc = await noteOperations.delete(id);
            res.status(200).json({
                data: doc
            })
        } catch (e) {
            res.status(404).json({
                error: e
            })
        }
    }
}