import React, {useState, useEffect } from 'react';
import { fetchGameStatus } from '../api'; // API 호출 함수
import '../css/onlinePlayersDisplay.css';

const OnlinePlayersDisplay = ({ onlineStatus, onlinePlayers, maxPlayers, errorMessage }) => {
    
    const onlineTitle = <h2 class="sub-title"><img id="sub-star" src="1.png" alt=""/> 서버 상태<img id="sub-star" src="1.png" alt=""/></h2>;
    const playersTitle = <h2 class="sub-title"><img id="sub-star" src="1.png" alt=""/> 현재 접속 중인 플레이어 수<img id="sub-star" src="1.png" alt=""/></h2>;
    const onlineMessage = onlineStatus ? '온라인' : '오프라인';

    return (
        <div>
            <hr/>
            {onlineTitle}
            {errorMessage ? (
                <div>{errorMessage}</div>
            ) :(
                <div id="online">{`서버가 ${onlineMessage} 상태입니다!`}</div>
            )}
            {onlineStatus ? (
                <>
                <hr/>
                {playersTitle}
                <div id="players">{`${onlinePlayers} / ${maxPlayers}`}</div>
                </>
            ) :null}
            
        </div>
    );
};
export default OnlinePlayersDisplay;
