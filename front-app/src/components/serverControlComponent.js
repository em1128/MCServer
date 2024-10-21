import React, { useState, useEffect } from 'react';

import { fetchGameStatus, runServer , backupWorld } from '../api'; // API 호출 함수
import '../css/ServerControlComponent.css';
import OnlinePlayersDisplay from './onlinePlayersDisplay';

const ServerControlComponent = () => {
    const [onlineStatus, setOnlineStatus] = useState();
    const [onlinePlayers, setOnlinePlayers] = useState();
    const [maxPlayers, setMaxPlayers] = useState();
    const [errorMessage, setErrorMessage] = useState();
    useEffect(() => {
        try{
            fetchGameStatus().then(data =>{
                setOnlineStatus(data.online);
                setOnlinePlayers(data.players);
                setMaxPlayers(data.max);
            });
            
        }catch(error){
            setErrorMessage('데이터를 가져오는 중 오류가 발생했습니다.');
        }
        // 1분(60,000ms)마다 API 호출
        const intervalId = setInterval(async () => {
            try{
                const data = await fetchGameStatus();
                setOnlineStatus(data.online);
                setOnlinePlayers(data.players);
                setMaxPlayers(data.max);
            }catch(error){
                setErrorMessage('데이터를 가져오는 중 오류가 발생했습니다.');
            }
        }, 60_000); // 60,000ms = 1분
        // 클린업 함수로 인터벌 정리
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // 접속 확인 클릭 시 호출되는 함수
    const handleFetchStatus = async () => {
        try {
            alert('서버 접속 확인 중입니다...');
            const data = await fetchGameStatus();
            setOnlineStatus(data.online);
            setOnlinePlayers(data.players);
            setMaxPlayers(data.max);
            setErrorMessage('');
            data.online ? alert(`서버가 온라인 상태입니다!`) : alert(`서버가 오프라인 상태입니다!`);
        } catch (error) {
            setErrorMessage('데이터를 가져오는 중 오류가 발생했습니다.');
        }
    };
    
    // 서버 열기 클릭 시 호출되는 함수
    const handleRunServer = async () => {
        try {
            alert('서버를 열고 있습니다...');
            const result = await runServer();
            alert(result.message);
        } catch (error) {
            alert('데이터를 가져오는 중 오류가 발생했습니다.');
        }
    };

    // 월드 백업 클릭 시 호출되는 함수
    const handleBackupWorld = async () => {
        try {
            alert('월드를 백업하고 있습니다...');
            const result = await backupWorld();
            alert(result.message);
        } catch (error) {
            alert('데이터를 가져오는 중 오류가 발생했습니다.');
        }
    };
    
    return (
        <div class="server-control">
            <h2 class="title"><img id="star" src="1.png" alt=""/> 마크 서버 관리기</h2>
            
            <div class="button-group">
                <button class="server-button" id="run-mcserver" onClick={handleRunServer}>서버 열기</button>
                <button class="server-button" id="backup-world" onClick={handleBackupWorld}>월드 백업</button>
                <button class="server-button" id="check-server" onClick={handleFetchStatus}>접속 확인</button>
            </div>
            {/* 자식 컴포넌트로 상태 전달 */}
            <OnlinePlayersDisplay
            onlineStatus={onlineStatus}
            onlinePlayers={onlinePlayers}
            maxPlayers={maxPlayers}
            errorMessage={errorMessage}
            />
        </div>
    );
};
export default ServerControlComponent;
