import { useSelector, useDispatch } from "react-redux";
import io from 'socket.io-client';
import { userUpdate } from "../store/actions/users";
import { useRouter } from 'next/router';
import { useState } from "react";
export const socket = io('https://damp-temple-32313.herokuapp.com/');

socket.on('welcome',(data)=>{
    console.log(data.message)
})

function Login(){

    //Variables
    const dispatch = useDispatch();
    const router = useRouter();
    const [alertText, setAlertText] = useState("");

    //Functions
    function clickHandlerJoin(){
        socket.emit('login',{
            user:{
                name:document.getElementById('input').value,
                gameName:document.getElementById('inputRoom').value,
            },
            type:'join'
        })
        responseHandler();
    }
    function clickHandlerCreate(){
        socket.emit('login',{
            user:{
                name:document.getElementById('input').value,
                gameName:document.getElementById('inputRoom').value,
            },
            type:'create'
        })
        responseHandler();
    }
    function responseHandler(){
        console.log(" > Handling...");
        socket.on('response',(data)=>{
            if(data.status == process.env.secretWord){           
                console.log(data)
                var user = {
                    name:data.name,
                    gameName:data.gameName,
                    socketId:data.socketId,
                    auth:true,
                }
                dispatch(userUpdate(user))
                router.push({
                    pathname: '/games/[gameName]',
                    query: { gameName: data.gameName },
                })
            }else{
                setAlertText(data.status);
                console.log(data.status);
                var alert = document.getElementById('alert');
                alert.style.display = 'flex';
                setTimeout(()=>{
                    alert.style.opacity = 1;
                    alert.style.marginBottom = '35%';
                }, 100)
                setTimeout(()=>{
                    alert.style.display = 'flex';
                    alert.style.opacity = 0;
                    alert.style.marginBottom = '55%';
                },1500)
            }
        })
    }

    //Page render
    return <div style={{display:'flex',justifyContent:'center',height:'100vh',alignItems:'center',flexDirection:'column'}}>
        <div id="alert" className="alert">
            <div className="alert-icon">!</div>
            <a>{alertText}</a>
        </div>
        <div className="loginHolder">
            <div className="login-left-side">
                <div className="login-header">
                    <div className="title-login">Comrade,</div>
                    <a className="subtitle-login">Preencha os campos</a>
                </div>
                <div className="login-body">
                    <a className="inputLabel">Name des soldaten</a>
                    <input style={{marginBottom:20}} id="input" placeholder="Soldaten" className="input"/>
                    <a className="inputLabel">Room code</a>
                    <input id="inputRoom" placeholder="Número da sala" className="input"/>
                    <div className="button-aligner">
                        <button style={{marginRight: '6%'}} onClick={clickHandlerJoin} className="button">ENTRAR NA SALA</button>
                        <button onClick={clickHandlerCreate} className="button without-bg">CRIAR SALA</button>
                    </div>
                </div> 
            </div>
            <div className="login-right-side">
                
            </div>
        </div>
    </div>
}


export default Login;