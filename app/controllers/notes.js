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
            return res.status(401).send({
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
        return res.status(400).json({ errors: e });
    }
};
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { message, isImportant } = req.body;

        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).json({
                errors: [{ message: 'Note not found' }]
            });
        }

        note.message = message;
        note.isImportant = isImportant;

        await note.save();

        return res.status(200).json(note);
    } catch(e) {
        return res.status(400).json({ errors: e });
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
            return res.status(401).send({
                errors: [{ message: 'User not found' }]
            });
        }

        const noteToDelete = await Note.findOne({
            where: { id, userId: user.id },
        });
        if (!noteToDelete) {
            return res.status(404).send({
                errors: [{ message: 'Note not found' }]
            })
        }

        await noteToDelete.destroy();

        return res.status(200).send({
            message: 'Deleted successfully',
        })
    } catch(e) {
        return res.status(400).json({ errors: e });
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
            return res.status(401).send({
                errors: [{ message: 'User not found' }]
            });
        }

        console.log(user.Notes);
        return res.status(200).json(user.Notes);
    } catch(e) {
        return res.status(400).json({ errors: e });
    }
};