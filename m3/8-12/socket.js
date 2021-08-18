const net = require("net");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const socket = new net.Socket();
const port = 8090;
const hostname = "127.0.0.1";

socket.setEncoding('utf-8');

socket.connect(port, hostname);

socket.on('data', (msg) => {
    console.log(msg)
});

socket.on('error', (error) => {
    console.log('报错啦:' + error);
})

socket.on('close', () => {
    console.log('服务器端下线啦')
})

// 输入端口
rl.setPrompt('说点啥:');
rl.prompt();
rl.on('line', (msg) => {
    socket.write(msg);
    rl.prompt();
});