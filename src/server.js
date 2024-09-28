const dotenv = require('dotenv'); // .env 파일에서 환경 변수 로드
dotenv.config();

const express = require('express');
const path = require('path');

const apiRouter = require('./routes/routes');

const port = process.env.PORT;// .env 파일에서 PORT 변수 사용

const app = express();
app.use(express.json()); // JSON 요청을 처리할 수 있도록 설정

// React의 빌드된 정적 파일 서빙
app.use(express.static(path.join(__dirname, '../build')));

// 루트 경로에 대한 요청 처리
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.use('/api', apiRouter); // 모든 /api 요청을 apiRouter로 보냄


// 모든 다른 경로는 React 앱으로 리다이렉트
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
