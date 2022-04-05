const express = require('express');
const enrouten = require('express-enrouten');

const app = express();
const port = 3000

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', enrouten({ directory: 'routes' }));

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Resource Not Found.' });
});

app.use((err, req, res, next) => {
    res.status(500).json(err);
})


app.listen(port, () => {
    console.log(`app is listening on ${port}`);
});

module.exports = app;