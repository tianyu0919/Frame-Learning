const http = require('http');
const fs = require('fs');
const path = require('path');
const interface = require('./interface/index.js');
const port = 8888;

const extArr = {
    js: 'application/javascript;charset=utf-8',
    html: 'text/html;charset=utf-8',
    css: 'text/css;charset=utf-8',
    mp3: 'application/audio;charset=utf-8',
    ico: 'application/octet-stream'
}

http.createServer((req, res) => {
    let { url } = req;
    console.log(url);
    url = decodeURI(url);
    const filePath = path.join(__dirname, url);
    //* 如果只有一个表示根目录
    if (url.length == 1) {
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        });
        res.end(fs.readFileSync('./index.html'))
    } else {
        //* 不是根目录，表示有请求地址
        if (url.includes('.')) {
            //* 如果有点，表示请求的文件
            let ext = url.split('.');
            ext = ext[ext.length - 1];
            fs.access(filePath, (err) => {
                //* 无地址
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/html;charset=utf-8'
                    });
                    res.end('没有该地址！')
                } else {
                    let { size } = fs.statSync(filePath); // 查看文件大小 设置Etag如果文件大小变了，那就重新获取文件。
                    //* 有地址
                    if (req.headers['if-none-match'] == size) {
                        res.writeHead(304);
                        res.end();
                    } else {
                        res.writeHead(200, {
                            'Content-Type': extArr[ext],
                            "Cache-control": `public,max-age=${60 * 3}`, // 强缓存，设置缓存时间，这样就不会再次请求了 当前设置的3个小时
                            "Etag": size
                        });
                        res.end(fs.readFileSync(filePath));
                    }
                }
            })
        } else {
            //* 接口文件
            interFaceKeys = Object.keys(interface);
            let hasFace = interFaceKeys.some(v => "/" + v === url);
            if (hasFace) {
                const data = interface[url.slice(1, url.length)]();
                res.writeHead(200, {
                    'Content-Type': "text/json;charset-utf-8"
                });
                res.end(JSON.stringify(data));
            } else {
                res.writeHead(200, {
                    'Content-Type': "text/json;charset-utf-8"
                });
                res.end(JSON.stringify({ code: 400, msg: '接口错误！' }));
            }
        }
    }
}).listen(port);

console.log(`服务已启动：\nhttp://localhost:${port}`)