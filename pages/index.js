import { useSelector, useDispatch } from "react-redux";
import io from 'socket.io-client';
import { userUpdate } from "../store/actions/users";
import { useRouter } from 'next/router';
var socket = {};

socket = io('http://localhost:5000');
socket.on('welcome',(data)=>{
    console.log(data.message)
})

function Login(){
    const dispatch = useDispatch();
    const router = useRouter();

    function clickHandler(){
        socket.emit('login',{
            name:document.getElementById('input').value,
            gameName:document.getElementById('inputRoom').value,
        })
        socket.on('response',(data)=>{
            if(data.status == process.env.secretWord){
                console.log(data)
                var user = {
                    name:data.name,
                    gameName:data.gameName,
                    auth:true,
                }
                dispatch(userUpdate(user))
                router.push({
                    pathname: '/games/[gameName]',
                    query: { gameName: data.gameName },
                })
            }
        })
    }

    return <div className="loginHolder">
        <a style={{marginBottom:20}} className="inputLabel">Secret Hitler</a>
        <a style={{fontSize:16, color:'rgba(190, 95, 245, 1)'}} className="inputLabel">Digite seu nick</a>
        <input style={{marginBottom:40}} id="input" placeholder="Nickname" className="input"/>
        <a style={{fontSize:16, color:'rgba(190, 95, 245, 1)'}} className="inputLabel">Digite sua sala</a>
        <input id="inputRoom" placeholder="Número da sala" className="input"/>
        <button onClick={clickHandler} className="button">ENTRAR</button>
    </div>
}


export default Login;