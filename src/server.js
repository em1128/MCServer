const dotenv = require('dotenv'); // .env 파일에서 환경 변수 로드
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const nunjucks = require('nunjucks');
dotenv.config();

const apiRouter = require('./routes/routes');
const passportConfig = require('../passport');
const { sequelize } = require('../models');
passportConfig();

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();

app.set('port', process.env.PORT); // .env 파일에서 PORT 변수 사용
app.use(morgan('dev')); // debug 메시지
app.set('view engine', 'html'); // 템플릿 엔진
nunjucks.configure('views', {
  express: app,
  watch: true,
});
// React의 빌드된 정적 파일 서빙
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json()); // JSON 요청을 처리할 수 있도록 설정
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter); // 모든 /api 요청을 apiRouter로 보냄

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
// 모든 다른 경로는 React 앱으로 리다이렉트
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// 서버 시작
app.listen(app.get('port'), () => {
  console.log(`Server is running on http://localhost:${app.get('port')}`);
});
