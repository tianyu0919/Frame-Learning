// TODO 这是服务器代码
const http = require('http');

const serverHandler = require('../app'); // * 业务代码

const PORT = 9527;

const server = http.createServer(serverHandler);

server.listen(PORT, () => {
    console.log(`listening on : http://localhost:${PORT}`);
});