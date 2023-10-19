const note = require('express').Router();
const fs = require('fs/promises');
const uuid =require('../helpers/uuid');

note.get('/api/notes',(req,res)=>{
    console.info(`${req.method} request received for note data`);
    fs.readFile("./db/db.json", "utf8",(err, data)=>{
        if(err){
          console.log(err);
        }else{
          console.info(JSON.parse(data));
        }
        res.send(data)
})
});

note.post('/api/notes', (req, res) => {
   
    console.info(`${req.method} request received to save new note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text} = req.body;
  
    // If all the required properties are present
    if (title && text) {
      const newNote= {
        title,
        text,
        note_id: uuid(),
      };

      fs.readFile("./db/db.json", "utf8",(err, data)=>{
        if(err){
          console.log(err);
        }else{
          const newData = JSON.parse(data);
          newData.push(newNote);
          fs.writeFile(`./db/db.json`, JSON.stringify(newData, null, 2), (err) =>
          err
            ? console.error(err)
            : console.log(
                `Review for ${newNote.product} has been written to JSON file`
              )
        );}
        });

      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting new note');
    }
  });


module.exports = note;
