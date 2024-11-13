const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log(req.body);
    res.send("Hello");
});

// MongoDB connection with database name
mongoose.connect("mongodb://localhost:27017/ContactUs")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

// Schema and model
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    Message: String
});

const Contact = mongoose.model('Contact', ContactSchema);

// POST route to save data
app.post('/', (req, res) => {
    const myData = new Contact(req.body);
    myData.save()
        .then(() => {
           
            res.send('This item has been saved to the database');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Item was not saved to the database');
        });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
