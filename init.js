const mongoose = require('mongoose');
const Chat = require('./models/chat');

connectToDatabase()
    .then(() => {
        console.log("Connected to MongoDB successfully!");
    })
    .catch(() => {
        console.log("Failed to connect to MongoDB.");
    });

//connect mongodb
async function connectToDatabase() {
        await mongoose.connect('mongodb://localhost:27017/Whatsapp');
}
const allChats = [
    {
        from: 'Alice',
        to: 'Bob',
        message: 'Hello Bob!',
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        from: 'Bob',
        to: 'Alice',
        message: 'Hi Alice! How are you?',
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        from: 'Charlie',
        to: 'Alice',
        message: 'Hey Alice, long time no see!',
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        from: 'Alice',
        to: 'Charlie',
        message: 'I know right! Let’s catch up soon.',
        created_at: new Date(),
        updated_at: new Date(),
    }
];

Chat.insertMany(allChats);