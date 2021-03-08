import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import React, { Component, useEffect, useState } from 'react';
import { socket } from '../../index'


socket.emit('getGameData',123);
const Game = ({}) => {

    //Variables
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [game, setGame] = useState({});
    const [selecting, setSelecting] = useState(false);
    const [cards, setCards] = useState([]);
    const [player, setPlayer] = useState({});
    const {auth, name, gameName} = useSelector((state) => state.user);

    //useEffects
    useEffect(() => {
        socket.on('gameDataRes'+router.query.gameName, data =>{
            setUsers(data.users);
            setGame(data);
            setCards(data.cards);
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

    useEffect(() => {
        socket.on('newTurn'+router.query.gameName, data =>{
            setGame(data);
        })
        return () => {
            socket.off;
          }
    }, [game]);

    //Functions
    function newTurn(){
        setSelecting(true);
    }

    //Page render
    return <div className="game-body">
        <div style={selecting ? {display:'flex'} : {display: 'none'}} className="select-card-president"> 
            {cards.slice(0, 3).map((value, index) => {
                if(value == 0){
                    return <div key={index} style={{width:'30%',marginRight:0}} className="fascist-law"></div>
                }
                else if(value == 1){
                    return <div key={index} style={{width:'30%',marginRight:0}} className="liberal-law"></div>
                }
            })}
        </div>
        <div className="other-players-top">
            {users.map((value, index) => {
                if(value.name != name) {
                    return <div 
                    key={index} 
                    style={{backgroundColor:"#B39C4D"}} 
                    className={"userBox " + (player.tag == 'Liberal' ? "" : value.tag)}
                    >{value.name}
                    {value.tag == 'Hitler' && player.tag != 'Liberal' ? <div className="bigode"></div> : null}</div>}})}
        </div>
        <div className="cards-mid">
            <div 
                onClick={game.actualTurn && game.actualTurn.name == name ? newTurn : null}
                title="Wait your turn to buy!" 
                className={"buy-cards " + (game.actualTurn && game.actualTurn.name == name ? "card-active" : "")}
                ></div>
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
                {value.tag == 'Hitler' ? <div className="bigode"></div> : null}
                </div>
            }
        })}
        </div>
    </div>
}

export default Game;