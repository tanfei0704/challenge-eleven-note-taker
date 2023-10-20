const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const noteRoutes = require('./routes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.use(noteRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
