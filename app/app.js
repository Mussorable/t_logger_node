require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./utils/db_orm');

// ------

const authRoutes = require('./routes/auth');

// ------

app.use(cors({
    origin: process.env.CLIENT_URL || process.env.CLIENT_LOCAL_URL,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// ------

sequelize.sync({ force: true })
    .then(() => {
        console.log('Sequelize connection successfully.');
        app.listen(process.env.SERVER_PORT);
        console.log('Sequelize server listening on port ' + process.env.SERVER_PORT);
    })
    .catch((err) => {
        console.error(err);
    });