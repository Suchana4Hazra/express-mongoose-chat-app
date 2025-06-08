const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const Chat = require('./models/chat'); // Assuming the chat model is in models/chat.js
const methodOverride = require('method-override'); // Middleware to support PUT and DELETE methods

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(methodOverride('_method')); // Middleware to support PUT and DELETE methods

const PORT = 3000;

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
    res.send('Welcome to the Mongo Express App!');
});

app.get('/chats', async (req, res) => {
    const chats = await Chat.find({});
    res.render('index.ejs', { chats });
});

// Create new chat
app.get('/chats/new', (req, res) => {
    res.render('new.ejs');
});

app.get('/chats/:id/edit', async (req, res) => {
    let {id} = req.params;
    const chat = await Chat.findById(id);
    res.render('edit.ejs',{chat})
});
    
// Edit chat
app.post('/chats', (req, res) => {
    const { from, to, message } = req.body;
    const chat = new Chat({
        from,
        to,
        message,
        created_at: new Date(),
        updated_at: new Date()
    });

    chat.save()
    .then(() => {
        res.redirect('/chats');
    })
    .catch(err => {
        console.error("Error saving chat:", err);
    });
})

//update chat
app.put('/chats/:id', async (req, res) => {
    let {id} = req.params;
    let {newMsg} = req.body;
    await Chat.findByIdAndUpdate(id, {message: newMsg, updated_at: new Date()}, {runValidators: true, new: true})
    .then(() => {
    res.redirect('/chats');
   })
})

//Delete chat
app.delete('/chats/:id', async (req, res) => {
    let {id} = req.params;
    await Chat.findByIdAndDelete(id)
    .then(() => {
        res.redirect('/chats');
    })
    .catch(err => {
        console.error("Error deleting chat:", err);
    });
});

connectToDatabase()
.then (() => {
    console.log("Connected to MongoDB successfully!");
})
.catch(() => {
    console.log("Failed to connect to MongoDB.");
});

async function connectToDatabase() {

    await mongoose.connect('mongodb://localhost:27017/Whatsapp');
}