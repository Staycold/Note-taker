const express = require('express');
const path = require('path');
const fs = require('fs');
const database = require('./Develop/db/db.json')
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('Develop/public'));



let notes= JSON.parse(fs.readFileSync(path.join(__dirname, '/Develop/db/db.json')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/Develop/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/Develop/public/notes.html')));

app.get('/api/notes', (req, res) => res.json(notes));


app.post('/api/notes', (req, res) => {
  
    let newNote = req.body;
  
   

    newNote.id = uuidv4();
    
    console.log(newNote);
  
    notes.push(newNote);

    fs.writeFileSync(path.join(__dirname, '/Develop/db/db.json'), JSON.stringify(notes));

    res.json(notes);
    
  });

  app.delete('/api/notes/:id', (req, res) => {
    const beGone = req.params.id;
     notes = notes.filter((value) => {
            return value.id !==beGone

    })
    fs.writeFileSync(path.join(__dirname, '/Develop/db/db.json'),JSON.stringify(notes));
    res.send("You have deleted a note, how do you feel?")
})



// ======================================
app.get("*", (req, res)=> res.sendFile(path.join(__dirname,'/Develop/public/index.html')));
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));