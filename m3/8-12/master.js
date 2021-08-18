const server = require("net").createServer();
const fork = require("child_process").fork;
const numCpu = require("os").cpus().length;
server.listen(8090);

let workers = [];
let cur = 0;

// 用户连接监听
server.on('connection', (socket) => {
    // 分配到进程
    workers[cur].send('socket', socket);
    cur = (cur + 1) % numCpu;
})
let createdWorker = () => {
    let worker = fork('./worker.js');

    worker.on("message", (msg) => {
        if (msg.act === 'suicide') {
            createdWorker();
        }
    });

    worker.on("exit", () => {
        console.log(`worker ${worker.pid} exited`);
        delete workers[worker.pid];
        createdWorker();
    })
    workers.push(worker);
    console.log(`Create worker.pid: ${worker.pid}`)
}

for (let i = 0; i < numCpu; i++) {
    createdWorker();
}