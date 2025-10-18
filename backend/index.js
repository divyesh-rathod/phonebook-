const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();




morgan.token("body", (req,res) => {
    return JSON.stringify(req.body);
})
app.use(morgan(":method,:url,:response-time,:body,"));
app.use(bodyParser.json());
app.use(cors())

let notes = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req,res) => {
   
    res.json(notes);
})

app.get("/api/persons/:id", (req, res) => {

    let singleNote = notes.find((data) => {
       return data.id === req.params.id;
    })
    if (!singleNote) {
        return res.status(404).end();
    }
    else {
        res.json(singleNote)
    }
})

  app.delete("/api/persons/:id", (req, res) => {
      let id = req.params.id;
      notes = notes.filter((notes) => {
        return notes.id !== id;
      });
      return res.status(204).end();
  });

app.post("/api/persons", (req, res) => {
    const { name, number } = req.body;
    if (!name || !number) {
        return res.status(400)
    }
    let findName = notes.find((notes) => {
        return notes.name === name;
    })
    if (findName) {
      return res.json({
        error: "This name is already Taken",
      });
    }
    let id =String(Math.ceil(Math.random() * 1000*31));
    const newobject = {
        id, name, number
    };
    notes.push(newobject);
    res.json("New person Added in the PhoneBook")
    
})

app.get("/info", (req, res) => { 
    "this is date"
    let currentDate = new Date().toISOString();
    res.send(` THe phonebook has info about ${notes.length} people` + new Date());
})
const PORT = process.env.PORT;

app.use(express.static("dist"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve("dist", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})