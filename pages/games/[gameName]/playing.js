import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import React, { Component, useEffect, useState } from 'react';
import { socket } from '../../index'



const Game = ({}) => {

    //Variables
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [game, setGame] = useState({});
    const [player, setPlayer] = useState({});
    const {auth, name, gameName} = useSelector((state) => state.user);

    //useEffects
    useEffect(() => {
        socket.emit('getGameData',123);
    },[game]);

    useEffect(() => {
        socket.on('userDisconnected',(data)=>{
            console.log(data);
        })
        return () => {
            socket.off;
          }
    }, [game]);

    useEffect(() => {
        socket.on('gameDataRes'+123, data =>{
            setUsers(data.users);
            setGame(data);
            users.forEach(element => {
                if(element.name == name){
                    setPlayer(element);
                }
            })
        })
        return () => {
            socket.off;
          }
    }, [users], [game]);


    //Functions
    const bigode = (tag) =>{
        console.log(tag)
        if(tag == 'Hitler'){
            return <div className="bigode"></div>
            
        }else{
            return null;
        }
        
    }
    

    //Page render
    return <div className="game-body">
        <div className="other-players-top">
            {users.map((value, index) => {
                if(value.name != name) {
                    return <div 
                    key={index} 
                    style={{backgroundColor:"#B39C4D"}} 
                    className={"userBox " + (player.tag == 'Liberal' ? "" : value.tag)}
                    >{value.name}
                    {bigode(value.tag)}</div>}})}
        </div>
        <div className="cards-mid">
            <div title="Wait your turn to buy!" className="buy-cards"></div>
            <div className="discard-cards"></div>
            <div className="laws-aligner">
                <div className="liberal-laws">
                {Array.from({ length: game.liberalLaws }, (_, index) => (
                    <div key={index} className="liberal-law"></div>
                    ))}
                </div>
                <div className="fascist-laws">
                {Array.from({ length: game.fascistLaws }, (_, index) => (
                    <div key={index} className="fascist-law"></div>
                    ))}
                </div>
            </div>
        </div>
        <div className="you-bottom">
        {users.map((value, index) => {
            if(value.name == name){
                return <div 
                key={index} 
                style={{backgroundColor:"#B39C4D"}} 
                className={`userBox ${value.tag}`}
                >{value.name}
                {bigode(value.tag)}
                </div>
            }
        })}
        </div>
    </div>
}

export default Game;