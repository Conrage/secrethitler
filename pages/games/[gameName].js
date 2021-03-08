import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import React, { Component, useEffect, useState } from 'react';
import { socket } from '../index'

const Home = ({}) =>{

    //Variables
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const {auth, name, gameName} = useSelector((state) => state.user);

    //useEffects
    useEffect(() => {
        socket.emit('getGameData',router.query.gameName);
    }, [users]);

    useEffect(() => {
        socket.on('userDisconnected',(data)=>{
            console.log(data);
        });
    }, [users]);

    useEffect(() => {
        socket.on('gameDataRes'+router.query.gameName, data =>{
            setUsers(data.users)
        })
        return () => {
            socket.off;
          }
    }, [users]);
    useEffect(() => {
        socket.on('gameStarted'+router.query.gameName, data => {
            router.push('/games/'+data+'/playing')
        })
        return () => {
            socket.off;
          }
    }, [users]);

    //Functions
    function startGame(){
        socket.emit('startGame', router.query.gameName);
    }

    //Page render
    if(auth){
        return( <div className="startGame-body">
            <div className="header">
                <div className="usersList">
                    {users.splice(0, 4).map((value, index) => <div key={index} className="userBox">{value.name}</div>)}
                </div>
                <div className="usersList">
                    {users.splice(0, 7).map((value, index) => <div key={index} className="userBox">{value.name}</div>)}
                </div>
            </div>
            <div className="body">
                <button onClick={startGame} className="button">COMEÇAR JOGO</button>
            </div>
            </div>
        )
            
    }else{
        return (<div>404</div>)
    }
}

  

export default Home;