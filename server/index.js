require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./utils/logger');
const userRoutes = require('./api/v1/routes/userRoutes');
const noteRoutes = require('./api/v1/routes/noteRoutes');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/v1/user/', userRoutes);
app.use('/v1/note/', noteRoutes);

app.listen(port = process.env.PORT, () => {
    console.log(`listening to ${port}`);
})

logger.debug('server setup complete');
