const fs = require('fs');
const path = require('path');
const http = require('http');
const extModule = require('./ext/ext.js');
const port = 1017;

// 启动一个服务。
http.createServer((req, res) => {
    const { url } = req; // 当前的请求地址
    const paramsUrl = url;
    res.setHeader("Access-Control-Allow-Origin", "*");
    /**
     * /index
     * /index?a=1
     * /index?a=1&b=2
     * */
    let params = null;

    if (paramsUrl.includes('?')) {
        params = paramsUrl.split('?')[1];

        if (params.includes('&')) {
            let tempParamsArray = params.split('&');

        }
    }

    /**
     * 当前请求的三种类型。
     * \ --- 根目录
     * \index --- 接口
     * \index.html --- 后缀名表示有文件请求
     **/
    let tempExt = null;
    if (url.length === 1) {
        // 根目录
        tempExt = {
            type: '*',
            path: '/'
        }
    } else {
        if (url.includes('.')) {
            // 是文件类型
            const tempArr = url.split('.');
            tempExt = {
                type: 'file',
                path: url,
                ContentType: tempArr[tempArr.length - 1]
            }
        } else {
            // 是接口类型
            tempExt = {
                type: 'Interface',
                path: url
            }
        }
    }

    if (tempExt.type != '*') { // 如果不是根目录的话
        if (tempExt.type === 'file') {
            const filePath = path.join(__dirname, 'build' + tempExt.path);
            // 检查文件是否存在。
            fs.access(filePath, (err) => {
                // 如果报错
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain;charset=utf-8'
                    })
                    res.end('文件加载失败');
                    return;
                }
                console.log(tempExt.ContentType, extModule[tempExt.ContentType]);
                res.writeHead(200, {
                    "Content-Type": extModule[tempExt.ContentType] || 'text/plain', // 拿到对应类型的返回类型
                    "Cache-Control": "public, max-age=0"
                })
                res.end(fs.readFileSync(filePath));
            })
        } else if (tempExt.type === "Interface") {
            res.writeHead(200, {
                'Content-Type': 'text/json;charset=utf-8'
            });

            setTimeout(() => {
                res.end(JSON.stringify(['我', '是', '后', '台', '反', '回', '的']))
            }, 2000)
        }
    } else { // 表示不是正确的请求路径，一般是主界面
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        });
        console.log(path.join(__dirname, 'build/index.html'));
        res.end(fs.readFileSync(path.join(__dirname, 'build/index.html')));
        //res.end("<h2 style='text-align: center'>欢迎来到程序世界！</h2>");
    }
}).listen(port)

console.log(`已开启服务:\nhttp://localhost:${port}/index.html`)