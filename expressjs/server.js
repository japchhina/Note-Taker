const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const uuidv1 = require('uuid/v1');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
app = express();
app.get('/api/notes', (req, res) => {
    readFileAsync('./db/db.json', 'utf8').then((notes) => {
        res.json(JSON.parse(notes));
    });
});
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
