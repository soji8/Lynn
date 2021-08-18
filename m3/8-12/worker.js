process.on("message", (message, socket) => {
    if (message === "socket" && socket) {
        socket.on('data', (msg) => {
            console.log(`${process.pid} ${msg}`)
        });

        socket.on('error', () => {
            console.log(`${process.pid} 出错啦`);
        });
        socket.on('close', () => {
            console.log(`${process.pid} 下线啦`);
        });
    }
});

process.on("uncaughtException", () => {
    process.send({act: 'suicide'})

    worker.close(() => {
        process.exit(1);
    });
})