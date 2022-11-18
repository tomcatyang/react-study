#!/usr/bin/env node
const child_process = require("child_process");
const program = require('commander');
const fs = require("fs");
const path = require("path");

// require.resolve('react-mini-web')获取安装包的目录
const tempFolder = `${require.resolve('react-mini-web').replace('/index.js','')}/file-template`;
// path.join(process.cwd(), "/")获取命令执行的目录
const currenFolder = path.join(process.cwd(), "/");

console.log('tempFolder', tempFolder);
console.log('currenFolder', currenFolder);


const cmdExcuteResult = (err, stdout, stderr) => {
    console.log(err);
    console.log(stdout, stderr);
};

const createProject = (projectName)=>{
    // 1、 创建项目文件夹
    try {
        if (!fs.existsSync(projectName)) {
            fs.mkdirSync(projectName);
        }
    } catch (err) {
        console.error(err);
    }

    var cmd =  `cd ${currenFolder}/${projectName}  
        echo "copy配置文件到项目目录"
        cp -r ${tempFolder}/webpack webpack
        cp -r ${tempFolder}/src src
        cp  ${tempFolder}/.babelrc ./
    `;

    child_process.exec(cmd, cmdExcuteResult);

    // 同步读取
    let packageData = fs.readFileSync(`${tempFolder}/package.json`);
    console.log("同步读取: " + packageData.toString());
    packageData = packageData.toString().replace('temp_project_name',projectName);
    fs.writeFile(`${currenFolder}/${projectName}/package.json`, packageData,  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
     });
}

program
  .version(require('./package').version, '-v, --version')    
  .command('init <projectName>')
  .action((projectName) => {
      console.log('projectName', projectName);
      createProject(projectName);
  });
  
program.parse(process.argv)