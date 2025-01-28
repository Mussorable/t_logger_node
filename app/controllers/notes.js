const { User, Note} = require('../models');

exports.add = async (req, res) => {
    try {
        const { email } = req.user;
        const { noteMessage, isImportant } = req.body;

        const user = await User.findOne({
            where: { email },
            include: [{ model: Note, as: 'Notes' }],
        });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'User not found',
            });
        }

        const newNote = await Note.create({
            noteMessage,
            isImportant,
            userId: user.id,
        });

        const response = {
            ...newNote.toJSON(),
            status: 'success',
            message: 'Note added'
        };

        return res.status(201).json(response);
    } catch(e) {
        return res.status(400).json({
            status: 'error',
            message: 'Error while adding note',
            errors: e
        });
    }
};
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { noteMessage, isImportant } = req.body;

        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).json({
                errors: [{ message: 'Note not found' }]
            });
        }

        note.noteMessage = noteMessage;
        note.isImportant = isImportant;

        await note.save();

        const response = {
            ...note.toJSON(),
            status: 'warning',
            message: 'Note updated'
        }

        return res.status(200).json(response);
    } catch(e) {
        return res.status(400).json({
            status: 'error',
            message: 'Error while updating note',
            errors: e
        });
    }
};
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.user;

        const user = await User.findOne({
            where: { email },
            include: [{ model: Note, as: 'Notes' }],
        });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'User not found'
            });
        }

        const noteToDelete = await Note.findOne({
            where: { id, userId: user.id },
        });
        if (!noteToDelete) {
            return res.status(404).json({
                status: 'error',
                message: 'Note not found'
            })
        }

        await noteToDelete.destroy();

        return res.status(200).json({
            status: 'success',
            message: 'Deleted successfully',
        })
    } catch(e) {
        return res.status(400).json({
            status: 'error',
            message: 'Error while deleting note',
            errors: e
        });
    }
};
exports.getAll = async (req, res) => {
    try {
        const { email } = req.user;

        const user = await User.findOne({
            where: { email },
            include: [{ model: Note, as: 'Notes' }],
        });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'User not found'
            });
        }

        return res.status(200).json(user.Notes);
    } catch(e) {
        return res.status(400).json({
            status: 'error',
            message: 'Error while getting notes',
            errors: e
        });
    }
};