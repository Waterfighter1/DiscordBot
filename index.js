// Require the necessary discord.js classes
const { Client, Intents, MessageManager } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
});

// Date Value controls for the !date Command
var today = new Date(); 
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();         

// Value for the command List
var commandList = `
    
                        NORMAL COMMANDS
    ?info commands ->   Sends List of Commands

    ?info version ->    States the Current Version of Error Bot

    ?clear ->   Clears the Discord Chat for up to 100 messages

    ?avatar ->  States the Author's Icon Image

    ?repeat x -> Repeats x through Error Bot

    ?del-prev -> Deletes the last two messages ( the message used to start the command, and the one previous )
    
    ?del x -> Replace x with how many messages you'd like to delete (Please add +1 to desired count because the command to delete will count as a message to be deleted as well)

    ?date ->    Sends the Current Date

    ?ping ->     Sends humorous message from Error Bot

    ?<3 ->  Sends a cute heart(and sometimes a lovey message)

    ?love-bot ->    Has the Bot send a cutsy message to itself

    ?dev-tester ->  A Dev tool to send the Author's ID

                        GAME COMMANDS

        Note: You will not need to memorize these; the game
        will instruct you with them when you need them

    !startGame -> Starts the game of Tic Tac Toe

    !endGame -> Ends the game of Tic Tac Toe

    !begin -> Lets the users state they are ready to begin ( helps to determine players ready to play )

    !playersReady -> When all players are ready, use this command to start the game

    !makeMove x -> Replace x with a value 1-9 and it will be the space you occupy (given it is your turn) 

`

// These are Variables for the Game
var player1 = 'none';                            //  Placeholder for Player1
var player2 = 'none';                            //  Placeholder for Player2
var settingPlayer = 0;                           // Keeps track of which Player is being set up (When determining Usernames)
var gameStage = 0;                               //  Updates the stage of the Game; controls when certain commands will be accepted
var currentTurn = 0;                             //  Keeps the Turn, switching between 0,1,2, to dictate with player can move (if any player at all)
var spaces = ['null','-','-','-','-','-','-','-','-','-','-'];    // An array of the spaces, it stores the values of X's and O's                 
var gameBoardTop = "-1-|-2-|-3-"                 // A string that stores the top line of the Game Board ( set to default for the instructions )
var gameBoardMid = "-4-|-5-|-6-"                 // ^ Same as above
var gameBoardBot = "-7-|-8-|-9-"                 // ^ Same as above
var win = "no"


// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
    
});


// This is an event handler that runs when a message is created in the discord
client.on('messageCreate', (message) => {
    
    // Defining Function of runGame
    function runGame() {
         // Dev Note: Yes, it is usually bad to keep Functions Defined within a event handler
         //           However, I have done this for the purpose of utalizing the "message" that is sensed within the event handler
         //           I need to know the location the message is coming from, and because of this I have included the funciton WITHIN the event handler
         //           Without this, I cannot run the message.channel.send and the bot doesn't know where to send the message too

        message.channel.send("initializing...");                    // Sending text to 'initialize' the files (letting user know everything is getting ready)         
        message.channel.send('Player 1 please enter "!begin"')      // This sends the prompt for the user to enter !begin so they can register as first player
        settingPlayer = 2;                                          // This identifies that Player 2 is getting Set Next
        gameStage = 1;                                              // This identifies that the Game is in the first stage (Player Setup)
    }

    // Defining Function of checkForWin 
    function checkForWin() {
        // updates board to check for win

        gameBoardTop = "-" + spaces[1] + "-|-" + spaces[2] + "-|-" + spaces[3] + "-"
        gameBoardMid = "-" + spaces[4] + "-|-" + spaces[5] + "-|-" + spaces[6] + "-"
        gameBoardBot = "-" + spaces[7] + "-|-" + spaces[8] + "-|-" + spaces[9] + "-"

        // Player 1 Wins
        // - - - - - - - - - - - - -
        // Wins From Horizontal Rows
        // - - - - - - - - - - - - -

        if ( spaces[1] == "x" && spaces[2] == "x" && spaces[3] == "x") {
            endGame(player1);
        }

        if ( spaces[4] == "x" && spaces[5] == "x" && spaces[6] == "x") {
            endGame(player1);
        }

        if ( spaces[7] == "x" && spaces[8] == "x" && spaces[9] == "x") {
            endGame(player1);
        }

        // - - - - - - - - - - - - -
        // Wins From Verticle Rows
        // - - - - - - - - - - - - -

        if ( spaces[1] == "x" && spaces[4] == "x" && spaces[7] == "x") {
            endGame(player1);
        }

        if ( spaces[2] == "x" && spaces[5] == "x" && spaces[8] == "x") {
            endGame(player1);
        }

        if ( spaces[3] == "x" && spaces[6] == "x" && spaces[9] == "x") {
            endGame(player1);
        }

        // Wins from Diagonals

        if ( spaces[1] == "x" && spaces[5] == "x" && spaces[9] == "x") {
            endGame(player1);
        }

        if ( spaces[7] == "x" && spaces[5] == "x" && spaces[3] == "x") {
            endGame(player1);
        }

        // Player 2 Wins
        // - - - - - - - - - - - - -
        // Wins From Horizontal Rows
        // - - - - - - - - - - - - -

        if ( spaces[1] == "o" && spaces[2] == "o" && spaces[3] == "o") {
            endGame(player2);
        }

        if ( spaces[4] == "o" && spaces[5] == "o" && spaces[6] == "o") {
            endGame(player2);
        }

        if ( spaces[7] == "o" && spaces[8] == "o" && spaces[9] == "o") {
            endGame(player2);
        }

        // - - - - - - - - - - - - -
        // Wins From Verticle Rows
        // - - - - - - - - - - - - -

        if ( spaces[1] == "o" && spaces[4] == "o" && spaces[7] == "o") {
            endGame(player2);
        }

        if ( spaces[2] == "o" && spaces[5] == "o" && spaces[8] == "o") {
            endGame(player2);
        }

        if ( spaces[3] == "o" && spaces[6] == "o" && spaces[9] == "o") {
            endGame(player2);
        }

        // Wins from Diagonals

        if ( spaces[1] == "o" && spaces[5] == "o" && spaces[9] == "o") {
            endGame(player2);
        }

        if ( spaces[7] == "o" && spaces[5] == "o" && spaces[3] == "o") {
            endGame(player2);
        }

        for (i = 1; i <= 9; i++) {
            var catCatch = 0
            if (spaces[i] != "-") {
                catCatch++
            }
        }

        if (catCatch == 9) {
            endGame("cat")
        }
       




    }

    function endGame(winner) {
        spaces = ['null','-','-','-','-','-','-','-','-','-','-'];    // An array of the spaces, it stores the values of X's and O's                 
        win = "yes"
        gameStage = 0;                                                                                  // sets the game stage to 0 ( no running game )                                                   // lets user know the game has ended
        if( winner != "cat")   {                                               
            message.channel.send("Congrats to " + winner + " for winning the Game!")
            message.channel.send("The Game Has Ended");  
            message.channel.send('Thank you for playing! Enter "!startGame" to begin a new game ')
        } else {
            message.channel.send('Cat! No Winner! Thank you for playing. Enter "!startGame" to begin a new game ')
            message.channel.send("The Game Has Ended");  
        }
        p1Score = 0;                                                                                    // resetting data...
        p2Score = 0;                                                                                    // ^
        player1 = 'none';                                                                               // ^
        player2 = 'none';                                                                               // ^
        gameBoardTop = "-1-|-2-|-3-"                 // A string that stores the top line of the Game Board ( set to default for the instructions )
        gameBoardMid = "-4-|-5-|-6-"                 // ^ Same as above
        gameBoardBot = "-7-|-8-|-9-"
    }
    // Start of Message Checking

    // ----------------- //
    // No PREFIX Messages
    // ----------------- //

    if (message.content === "Hello")        // When the message says "Hello"
    {
        message.reply("Welcome!")           // the bot replies with "Welcome"
        }

    
    // --------------------- //
    // Command PREFIX Message
    // --------------------- //

    const PREFIX = "?"                                                  // Defines the regular command Prefix 

    let args = message.content.substring(PREFIX.length).split(" ");     // This turns the message into an Array, using 'args'. (It seperates the prefix from the rest of the message)
   

    switch (args[0])                                                    // This is a switch statement that has cases based off the content of the first args
    {
        case 'ping':                                                                // When ?ping is run
            message.reply('pong');                                                      // Reply with pong
            break;                                                                  // end of case

        case 'clear':                                                               // when ?clear is run
            message.channel.bulkDelete(100);                                            // deletes previous 100 messages
            break;                                                                  // end of case

        case 'website':                                                             // When ?website is run
            message.channel.send("https://waterfighter1.github.io/index.html");         // respond with link to my github website
            break;                                                                  // end of case

        case 'info':                                                                // when ?info is run
            if (args[1] == 'version') {                                             // if ?info version is run
                message.channel.send("version 1.1")                                     // reply with version #
            } else if (args[1] == 'cmds' || args[1] == 'commands') {                // if ?info comds or ?info commands is run
                message.channel.send(commandList)                                       // reply with the command List
            } else { message.channel.send("invaid args") }                          // if no secondary argument is given or an invalid one, reply with "invalid"
            break;                                                                  // end of case

        case 'avatar':                                                              // when ?avatar is run
            message.reply(message.author.displayAvatarURL());                           // reply with the message author's avatar ( who sent it's avatar )
            break;                                                                  // end of case

        case 'date':                                                                // when ?date is run
            message.reply(date);                                                        // reply with variable 'date' (see definition on line 15)
            break;                                                                  // end of case

        case '<3':                                                                  // when ?<3 is run
            if (message.author.username == "Waterfighter1") {                       // if the author of the message is Waterfighter1
                message.reply("I love you, Anthony");                                   // respond with "I love you Anthony"
            } else if (message.author.username == "Ajsnakebite87"){                 // if the author of the message if AJsnakebite87
                message.reply("I love you, Chloe")                                      // respond with "I love you Chloe"
            } else {                                                                // if the author of the message is neither of those two
                message.reply("Thats sweet ^.^")                                        // respond with "Thats sweet"
            }               
            break;                                                                  // end of case

        case 'love-bot':                                                            // when ?love-bot is run
            message.reply("?<3")                                                        // respond with ?<3 ( running the previous command )
            break;                                                                  // end of case

        case 'who-am-i':                                                            // when ?who-am-i is run
            message.reply(message.author.username);                                     // reply with authors username
            break;                                                                  // end of case

        case 'dev-tester':                                                          // when ?dev-tester is run
            message.reply(message.author.id);                                           // reply with author's ID
            break;                                                                  // end of case
        
        case 'del-prev':                                                            // when ?del-prev is run
            message.channel.bulkDelete(2);                                              // delete the last message
            break;                                                                  // end of case

        case 'del':                                                                 // when?del is run
            message.channel.bulkDelete(args[1]);                                         // delete however many is specified
            break;                                                                  // end of case

        case 'repeat':                                                              // when ?repeat is run
            message.channel.send(args[1])                                                  // send back what was sent
            break;                                                                  // end of case
        case 'botMove':
            message.channel.send("!makeMove " + args[1])
    }

    // ------------------- //
    // Game PREFIX Message
    // ------------------- // 

    const GAMEPREFIX = "!"                                                          // defines the Game Prefix
    let gameArgs = message.content.substring(GAMEPREFIX.length).split(" ");         // sets the message == to 
    switch (gameArgs[0])                                                            // the switch statement that controls the gameArgs
    {
        case 'startGame':                                                           // when !startGame is run
            win = "no"
            if (gameStage == 0) {                                                   // if the game stage is appropriate (initial value set on line 24)
                message.channel.send("The Game Has Begun");                             // respond with "The Game Has Begun"
                runGame();                                                              // run the function runGame ( see on line 85 )
                gameRunning = true;                                                     // declares the game as running 
            } else {                                                                // if not
                message.channel.send("Cannot start a game, current game in progress... please enter !endGame to restart game...")
            }  
            break;                                                                  // end case

        case 'endGame':                                                                                     // when !endGame is run
            if (gameStage > 0) {                                                                            // check to see if the game stage isn't 0 ( meaning game is running )
                if (message.author.username == player1 || message.author.username == player2) {                 // checks to see if the author of the message is actually a part of the game                                   
                    gameStage = 0;                                                                                  // sets the game stage to 0 ( no running game )
                    message.channel.send("The Game Has Ended");                                                     // lets user know the game has ended
                    p1Score = 0;                                                                                    // resetting data...
                    p2Score = 0;                                                                                    // ^
                    player1 = 'none';                                                                               // ^
                    player2 = 'none';                                                                               // ^
                    gameBoardTop = "-1-|-2-|-3-"                 // A string that stores the top line of the Game Board ( set to default for the instructions )
                    gameBoardMid = "-4-|-5-|-6-"                 // ^ Same as above
                    gameBoardBot = "-7-|-8-|-9-"
                } else {                                                                                        // if the author isn't a part of the game
                    message.channel.send("That is increadible rude," + message.author.username +". Please do not attempt to end a game you are not a part of.")
                }                                                      
                break;                                                               // end if

            } else {                                                                // if game stage is 0 ( if a game isn't running )
                message.channel.send("There is No Active Game")                         // let the user know the action cannot be performed
            }
            break;                                                                  // end case

        case 'begin':                                                               // when !begin is run
            if ( gameStage == 1 || gameStage == 2) {                                // if game stage is 1 or 2 (1 is defining player1 And 2 is defining player2)
                if (settingPlayer == 2) {                                              // if settingPlayer is 2
                    player1 = message.author.username;                                      // define player1 with the message Author's name
                    settingPlayer = 3;                                                      // define settingPlayer as 3 so it knows that both players have been set( but can still run the !begin after player2 enters their info)
                    message.channel.send('Player 2 please enter "!begin"')                  // asks for input from player2
                    break;                                                                  // end if
                } else if (settingPlayer == 3) {                                        // if settingPlayer is 3 ( both players have been set )
                    player2 = message.author.username;                                      // defines player2 with message Author's name
                    settingPlayer = 0;                                                      // resets the settingPlayer since we wont need to set anything
                    message.channel.send("Player 1: " + player1);                           // sends message displaying player1
                    message.channel.send("Player 2: " + player2);                           // sends message displyaing plaer2
                    message.channel.send("Is this correct? Enter !playersReady if yes, or !endGame if not")     // prompts for correct players
                    gameStage = 3;                                                          // gameStage is set to 3 (instruction stage)
                    break;                                                              // end if
                }                                     
            }
            break;                                                                   // end case

        case 'playersReady':                                                        // when !playersReady is run
            if (gameStage == 3 ) {                                                  // if gameStage is 3 (instruction stage)
            message.channel.send("preparing game files...")                         // send message "preparing game files"

            message.channel.send(gameBoardTop)                                      // displays top of Game Board
            message.channel.send(gameBoardMid)                                      // displays mid of Game Board
            message.channel.send(gameBoardBot)                                      // displays bottom of Game Board

            message.channel.send(player1 + " When Ready use !makeMove with the numer of the square you'd like to occupy")   // instructs Player1 how to move
            message.channel.send(" Numbers move left to right and descend")         // send message instructing order of grid
            message.channel.send(" Ex: !makeMove 3")                                // send message of example

            currentTurn = 1;                                                        // starts Turn system

            gameBoardTop = "---|---|---"                                            // Re-Defines Game Board (removing the numbers)
            gameBoardMid = "---|---|---"                                            // ^
            gameBoardBot = "---|---|---"                                            // ^

            gameStage = 4                                                           // sets gameStage to 4 (playing stage)
            }   
            break;                                                                  // end case

        case 'makeMove':                                                                                        // when !makeMove is run
                if (gameStage == 4) {                                                                           // if gameStage if 4 (playing stage)
                    if (currentTurn == 1 && message.author.username == player1) {                                   // if turn is 1 and author of message is Player1
                        if (args[1] >= 1 && args[1] <= 9) {                                                             // if the move # is valid
                           for (i = 1; i <= 9; i++) {                                                                       //loops through the possible tiles
                                if (args[1] == i) {                                                                             // when the possible tile is the same as the one you selected
                                    if (spaces[i] == "-") {                                                                          // if it is empty
                                        spaces[i] = "x";                                                                           // replace it with an X
                                        checkForWin();                                                                                  // checks for win
                                        if (win == "no") {
                                            message.channel.send("Make your Move, Player 2")                                                         // states the users turnm
                                            message.channel.send(gameBoardTop)                                                              // print top
                                            message.channel.send(gameBoardMid)                                                              // print mid
                                            message.channel.send(gameBoardBot)                                                              // print bot
                                            currentTurn = 2;                                                                                // switches turn    
                                        }                                                                                                                                                      // Check for Win
                                    } else {                                                                                        // if its not empty
                                        message.channel.send("invalid, this space is already occupied")                                 // send a message saying its occupied
                                    }   
                                }                                                                              
                            }                                                                                
                        } else {                                                                                        // if not
                            message.channel.send("Invalid, please enter !makeMove with a value between 1-9")               // ask for a valid input
                        }
                    } else if (currentTurn == 2 && message.author.username == player2) {                            // if turn is 2 and the author of the message is Player2
                        if (args[1] >= 1 && args[1] <= 9) {                                                             // if the move # is valid
                            for (i = 1; i <= 9; i++) {                                                                      //loops through the possible tiles
                                if (args[1] == i) {                                                                             // when the possible tile is the same as the one you selected
                                    if (spaces[i] == "-") {                                                                          // if it is empty
                                        spaces[i] = "o"                                                                                 // replace it with an O
                                        checkForWin();                                                                                  // Check for Win
                                        if (win == "no") {
                                            message.channel.send("Make your Move, Player 1")                                                         // states the users turnm
                                            message.channel.send(gameBoardTop)                                                              // print top
                                            message.channel.send(gameBoardMid)                                                              // print mid
                                            message.channel.send(gameBoardBot)                                                              // print bot
                                            currentTurn = 1;                                                                                // switches turn    
                                        }                                                                     // switches turn
                                    } else {                                                                                         // if its not empty
                                        message.channel.send("invalid, this space is already occupied")                                 // send a message saying its occupied
                                    }
                                }                                                                              
                            }                                                                               
                        } else {                                                                                        // if not
                            message.channel.send("Invalid, please enter !makeMove with a value between 1-9")                // ask for valid input
                        }
                    } else if (currentTurn == 1 && message.author.username == player2) {                            // if the turn is 1 and the author of the message is Player2
                        message.channel.send(player2 + " please wait your turn, it is " + player1 + "'s turn")          // asks player2 to wait their turn
                    } else if (currentTurn == 2 && message.author.username == player1) {                            // if the turn is 2 and the author of the message is player1
                        message.channel.send(player1 + " please wait your turn, it is " + player2 + "'s turn")          // asks player1 to wait their turn
                    } else {                                                                                        // if it is neither player1 or player2 who requested
                        message.channel.send(message.author.username + " you are not currently a player in this game")  // ask that they wait until the game is open to play
                        message.channel.send("please wait until this game has concluded before you try to play")        // ^
                    }
                }

            break;

    }
})

// Login to Discord with your client's token
client.login(token);