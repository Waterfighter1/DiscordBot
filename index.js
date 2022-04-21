// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
var today = new Date();

var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
// Create a new client instance
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
    
});

client.on('messageCreate', (message) => {
   

    if (message.content === "Hello")
    {
        message.reply("Welcome!")
        }

    const PREFIX = "?"
    let args = message.content.substring(PREFIX.length).split(" ");
   
    
     
    switch (args[0])
    {
        case 'ping':
            message.reply('pong');
            break;
        case 'clear':
            message.channel.bulkDelete(100);
            break;
        case 'website':
            message.channel.send("https://waterfighter1.github.io/index.html");
            break;
        case 'info':
            if (args[1] == 'version') {
                message.channel.send("version 1.0")
            } else { message.channel.send("ivnaid args") }
            break;
        case 'avatar':
            message.reply(message.author.displayAvatarURL());
            break;
        case 'date':
            message.reply(date);
            break;
        case '<3':
            if (message.author.username == "Waterfighter1") {
                message.reply("I love you, Anthony");
            } else if (message.author.username == "Ajsnakebite87"){
                //message.reply("Still not Working")
                message.reply("I love you, Chloe")
            } else {
                message.reply("Thats sweet ^.^")
            }
            break;
        case 'love-bot':
            message.reply("?<3")
            break;
        case 'who-am-i':
            message.reply(message.author.username);
            break;
        case 'dev-tester':
            message.reply(message.author.id);
    }

    const GAMEPREFIX = "!"
    let gameArgs = message.content.substring(GAMEPREFIX.length).split(" ");
    switch (gameArgs[0])
    {
        case 'startGame':
            //message.reply("The Game Has Begun");
            message.channel.send("The Game Has Begun");
    }
})

// Login to Discord with your client's token
client.login(token);