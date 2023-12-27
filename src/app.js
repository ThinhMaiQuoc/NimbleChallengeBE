const express = require('express');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());

app.use('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
