
export const fetchGameStatus = async () => {
    const response = await fetch('/api/check-server2'); // 서버 API URL
    if (!response.ok) {
        throw new Error('API 호출 실패');
    }
    return response.json();
};

export const runServer = async () => {
    const response = await fetch('/api/run-mcserver'); // 서버 API URL
    if (!response.ok) {
        throw new Error('API 호출 실패');
    }
    return response.json();
};

export const backupWorld = async () => {
    const response = await fetch('/api/backup-world'); // 서버 API URL
    if (!response.ok) {
        throw new Error('API 호출 실패');
    }
    return response.json();
};
