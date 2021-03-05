const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });


const port = 5000;


var usersArray = [];
var gamesArray = [];

var whiteList = [
    "Luis","Vitor","João","Conrad","Gustavo","Caio"
]

io.on('connect', socket => {
    socket.emit('welcome',{
        message:"Welcome!"
    })
    socket.on('login',(data)=>{
        for(var i = 0; i < whiteList.length; i++){
            if(data.name == whiteList[i]){
                var user = {
                    name:data.name,
                    gameName:data.gameName,
                    status:"success",
                }
                usersArray.push(user);
                gamesArray.push(user.gameName);
                io.emit('response',user)
                return;
            }
        }
        io.emit('response',{
            status:"failed"
        })
    })
    socket.on('getGameData',data=>{
        var usersOnGame = [];
        for(var i = 0; i < usersArray.length; i++){
            if(usersArray[i].gameName == data.code){
                usersOnGame.push(usersArray[i])
            }
        }
        io.emit(data.code+'Res', usersOnGame);
    })
})
app.get('*',(req,res)=>{
    return nextHandler(req,res)
})

server.listen(port, (error)=>{
    if(error) throw new error
    console.log('Listening on '+port)
})