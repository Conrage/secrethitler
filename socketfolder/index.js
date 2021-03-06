const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');

const httpServer = require('http').createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
});

const io = require('socket.io')(httpServer,{
  cors:{
    origin:'*',
  }
});

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
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log('listening to '+PORT);
});
