import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import io from 'socket.io-client';
import React, { useState } from 'react';

var socket = {};
socket = io('https://damp-temple-32313.herokuapp.com/');

function Home(){
    const [users, setUsers] = useState([]);
    const router = useRouter();
    const {auth, name, gameName} = useSelector((state) => state.user);
    socket.emit('getGameData',{
        code:router.query.gameName,
    });

    socket.on(router.query.gameName+'Res',(data)=>{
        setUsers(data);
    })

    if(auth){
        return <div>
            <div className="header">
                <div className="usersList">
                    {users.splice(0, 4).map((value, index) => {
                        return <div key={index} className="userBox">{value.name}</div>
                    })}
                </div>
                <div className="usersList">
                    {users.splice(0, 7).map((value, index) => {
                        return <div key={index} className="userBox">{value.name}</div>
                    })}
                </div>
            </div>
            <div className="body">
                <button className="button">COMEÇAR JOGO</button>
            </div>
          </div>
    }else{
        return <div>404</div>
    }
    
}

export default Home;