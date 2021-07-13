const path = require('path');
const fs = require('fs');

module.exports = {
    // 获取本地音乐列表
    getList() {
        const resFileDir = "../audio";
        const dirFils = fs.readdirSync(path.join(__dirname, resFileDir));
        let obj = [];
        const relativePath = path.relative(__dirname, path.join(__dirname, resFileDir));
        dirFils.forEach(v => {
            obj.push({
                path: path.join(__dirname, resFileDir),
                relPath: relativePath,
                name: v
            })
        })

        return obj
    }
}