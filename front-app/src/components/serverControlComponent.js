import React, { useEffect, useState } from 'react';

import { fetchGameStatus, runServer , backupWorld } from '../api'; // API 호출 함수
import '../css/ServerControlComponent.css';
import OnlinePlayersDisplay from './onlinePlayersDisplay';

const ServerControlComponent = () => {
    const [onlineStatus, setOnlineStatus] = useState(false);
    const [onlinePlayers, setOnlinePlayers] = useState(0);
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(async () => {
        const data = await fetchGameStatus(); // 컴포넌트 마운트 시 API 호출
        setOnlineStatus(data.online);
        setOnlinePlayers(data.players);
        setMaxPlayers(data.max);
        // 5분(300,000ms)마다 API 호출
        const intervalId = setInterval(() => {
            fetchGameStatus();
        }, 300_000); // 300,000ms = 5분
        // 클린업 함수로 인터벌 정리
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // 접속 확인 클릭 시 호출되는 함수
    const handleFetchStatus = async () => {
        try {
            const data = await fetchGameStatus();
            setOnlineStatus(data.online);
            setOnlinePlayers(data.players);
            setMaxPlayers(data.max);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('데이터를 가져오는 중 오류가 발생했습니다.');
        }
    };
    
    // 서버 열기 클릭 시 호출되는 함수
    const handleRunServer = async () => {
        try {
            const data = await runServer();
            alert('서버를 열고 있습니다...');
        } catch (error) {
            setErrorMessage('데이터를 가져오는 중 오류가 발생했습니다.');
        }
    };

    // 월드 백업 클릭 시 호출되는 함수
    const handleBackupWorld = async () => {
        try {
            const data = await backupWorld();
            alert('월드를 백업하고 있습니다...');
        } catch (error) {
            setErrorMessage('데이터를 가져오는 중 오류가 발생했습니다.');
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
