// * 文件类型处理
const PATH = require('path');
const FS = require('fs');
const extArr = require('./utils/ext');

module.exports = (req, res) => {
    let { url } = req;
    const { dir, ext, basename } = PATH.parse(url);
    let filePath = "";
    // * 如果是根目录，跳转到主页
    if (dir === '/' || dir === "/css" || dir === "/js") {
        filePath = PATH.join(__dirname, `./src/${url}`);
    }else {
        filePath = PATH.join(__dirname, url);
    }
    FS.access(filePath, err => {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'plain/text;charset=utf-8'
            });
            res.end('404 NOT FOUND!!!');
            return;
        };
        const ContentType = extArr[ext.split('.')[1].toUpperCase()] || "plain/text;charset=utf-8";
        const { size } = FS.statSync(filePath);
        if (req.headers['if-none-match'] == size) {
            res.writeHead(304, {
                'Content-Type': ContentType
            });
            res.end(FS.readFileSync(filePath));
            return;
        }
        res.writeHead(200, {
            'Content-Type': ContentType,
            'Cache-Control': 'public, max-age=60',
            'Etag': size
        })
        res.end(FS.readFileSync(filePath));
    })
}