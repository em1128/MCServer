const { exec } = require('child_process');
const path = require('path');

const serverFilePath = process.env.SERVER_FILE_PATH;
const runPath = path.join(serverFilePath, 'run.bat');
const backupPath = path.join(serverFilePath, 'backup_world.bat');

function findProcessWindows(processName, callback){
    exec(`tasklist /FI "IMAGENAME eq ${processName}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        callback(false); // 에러 발생 시 false 반환
        return;
      }
      // 출력 결과에서 processName이 포함된 경우 찾았다고 판단
      if (stdout.includes(processName)) {
        callback(true); // 프로세스를 찾았을 경우 true 반환
      } else {
        callback(false); // 프로세스를 찾지 못했을 경우 false 반환
      }
    });
  }
  
exports.run = async (req, res) => findProcessWindows('java.exe', (isFound) => {
    if(!isFound){
    exec(`start "" "${runPath}"`, (error, stdout, stderr) => {
        if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).send('Error executing shortcut');
        return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        
        res.json({message: '서버 Off.'});
    });
    }else{
        res.json({message: '서버가 이미 열려있습니다!'});
    }
});

exports.backup = async (req, res) => exec(`start "" "${backupPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.json({message: '백업 실행 에러!'});
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.json({message: '백업이 완료되었습니다.'});
  });