// TODO 这是业务代码
const querystring = require('querystring');
const HandlerUserInfoRouter = require('./src/routes/userInfo');

const serverHandler = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { method, url } = req;
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
        res.end('错了')
    }
}

module.exports = serverHandler;