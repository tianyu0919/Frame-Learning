// TODO 这是业务代码
const PATH = require('path');
const querystring = require('querystring');

const isFile = require('./redirectFile');

const HandlerUserInfoRouter = require('./api/routes/userInfo');

// * 白名单列表
const whiteList = new Set([
    'http://127.0.0.1:5501',
    'http://127.0.0.1:5502'
]);

const serverHandler = async (req, res) => {
    const reqOrigin = req.headers.origin || "";
    // * 设置白名单
    if (reqOrigin && whiteList.has(reqOrigin)) {
        console.log('开始设置请求头');
        res.setHeader('Access-Control-Allow-Origin', reqOrigin);
    }

    const { method, url } = req;
    const { ext } = PATH.parse(url);
    if (ext) {
        isFile(req, res);
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    const path = url.split('?')[0]; // 存储请求路径
    const query = querystring.parse(url.split("?")[1]);
    req.path = path;
    req.query = query;

    console.log('---------START---------');
    console.log('method:', method);
    console.log('path:', path);
    console.log('url:', url);
    console.log('query:', query);
    console.log('---------END---------');

    const userInfoData = await HandlerUserInfoRouter(req, res);
    if (method === "GET") {
        if (userInfoData) {
            res.end(
                JSON.stringify(userInfoData)
            )
            return;
        }
        res.writeHead(404, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        res.end('错了!')
    }
}

module.exports = serverHandler;