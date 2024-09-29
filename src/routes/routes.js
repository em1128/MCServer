
const express = require('express');
const router = express.Router();
const path = require('path');
const { exec } = require('child_process');
const axios = require('axios');
const mcs = require('node-mcstatus');

const limitMiddle = require('../middlewares/limiterMW');
const serverService = require('../services/serverService');
const controllers = require('../controllers/controllers');


// .lnk 파일을 실행하는 라우트
router.get('/run-mcserver', limitMiddle.hardLimiter, serverService.run);
// .lnk 파일을 실행하는 라우트
router.get('/backup-world', limitMiddle.softLimiter, serverService.backup);
router.get('/check-server', limitMiddle.softLimiter, async (req, res) => {

  // 서버 상태 확인
  mcs.statusJava(process.env.HOST_IP, process.env.HOST_PORT)
    .then((result) => {
      if (result.online) {
        const msg = `서버가 온라인 상태입니다! 플레이어 수: ${result.players.online}/${result.players.max}`;
        console.log(msg);
        res.send(msg);
      } else {
        const msg = '서버가 오프라인 상태입니다.'
        console.log(msg);
        res.send(msg);
      }
    })
    .catch((error) => {
      console.error('서비스 오류:', error);
    });

});
router.get('/check-server2', limitMiddle.softLimiter, async (req, res) => {

    // 서버 상태 확인
    mcs.statusJava(process.env.HOST_IP, process.env.HOST_PORT)
      .then((result) => {
        if (result.online) {
          const msg = `서버가 온라인 상태입니다! 플레이어 수: ${result.players.online}/${result.players.max}`;
          console.log(msg);
          res.json({
              online: result.online,
              players: result.players.online
          });
        } else {
          const msg = '서버가 오프라인 상태입니다.'
          console.log(msg);
          res.json({
              online: result.online
          });
        }
      })
      .catch((error) => {
        console.error('서비스 오류:', error);
      });
  
  });
router.get('/secret-kill', (req, res) => {
    findAndKillProcessWindows('java.exe');
    res.send('kill server');
});

router.get('/secret-off', (req, res) => {
    shutdownComputer();
    res.send('PC off');
});

// Windows에서 프로세스 목록을 가져오고 PID를 파싱하여 종료하기
async function findAndKillProcessWindows(processName) {
    exec(`tasklist /FI "IMAGENAME eq ${processName}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return;
        }

        // PID 추출 (간단한 파싱, 실제 환경에 맞게 조정 필요)
        const lines = stdout.split('\n');
        lines.forEach(line => {
            if (line.includes(processName)) {
                const columns = line.trim().split(/\s+/);
                const pid = columns[1];
                console.log(`Killing PID: ${pid}`);
                exec(`taskkill /F /PID ${pid}`, (error) => {
                    if (error) {
                        console.error(`Error killing PID ${pid}: ${error}`);
                    } else {
                        console.log(`PID ${pid} killed successfully`);
                    }
                });
            }
        });
    });
}

// Linux/macOS에서 프로세스 목록을 가져오고 PID를 파싱하여 종료하기
async function findAndKillProcessUnix(processName) {
    exec(`ps aux | grep ${processName} | grep -v grep`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return;
        }

        // PID 추출 (간단한 파싱, 실제 환경에 맞게 조정 필요)
        const lines = stdout.split('\n');
        lines.forEach(line => {
            if (line.includes(processName)) {
                const columns = line.trim().split(/\s+/);
                const pid = columns[1];
                console.log(`Killing PID: ${pid}`);
                exec(`kill -9 ${pid}`, (error) => {
                    if (error) {
                        console.error(`Error killing PID ${pid}: ${error}`);
                    } else {
                        console.log(`PID ${pid} killed successfully`);
                    }
                });
            }
        });
    });
}

function shutdownComputer(options = '/s /f /t 0') {
  exec(`shutdown ${options}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

module.exports = router;