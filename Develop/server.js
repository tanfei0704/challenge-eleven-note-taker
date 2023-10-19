const express =require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

const apiRouter = require('./routes/notes.js');
const htmlRouter =require('./routes/html.js');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use(apiRouter);
app.use(htmlRouter);

app.listen(PORT,()=>
    console.log(`App listening at http://localhost:${PORT}`)
)