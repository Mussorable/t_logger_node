require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const cron = require('node-cron');
const { Note } = require('./models');

// ------

const authRoutes = require('./routes/auth');
const trucksRoutes = require('./routes/trucks');
const notesRoutes = require('./routes/notes');

// ------

app.use(cors({
    origin: process.env.CLIENT_URL || process.env.CLIENT_LOCAL_URL,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// ------

app.use('/auth', authRoutes);
app.use('/trucks', trucksRoutes);
app.use('/notes', notesRoutes);

// ------

cron.schedule("0 1 * * *", async () => {
    try {
        console.log('Starting daily notes deleting...');
        await Note.destroy({ where: {} });
        console.log('Notes deleted successfully.');
    } catch(e) {
        console.error('Error while running cron', e);
    }
}, {
    scheduled: true,
    timezone: 'Europe/Warsaw'
});

// ------

sequelize.sync({ force: true })
    .then(() => {
        console.log('Sequelize connection successfully.');
        app.listen(process.env.SERVER_PORT, () => {
            console.log('Sequelize server listening on port ' + process.env.SERVER_PORT);
        });
    })
    .catch((err) => {
        console.error(err);
    });