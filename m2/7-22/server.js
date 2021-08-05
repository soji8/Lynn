const http = require("http");
const express = require("express");
const fs = require("fs");

const app = new express();

// 静态文件
app.use(express.static(__dirname));

// 路由
app.get('/', (req, res) => {
    console.log(fs)
    res.render(__dirname + '/index.html', {
        title: '11223'
    });
});

app.post('/code', (req, res) => {
    console.log(req, res);
})


app.listen(3000, () => {
    console.log(3000);
})