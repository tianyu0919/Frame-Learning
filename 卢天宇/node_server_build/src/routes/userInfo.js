// TODO 接口
const { dbQuery } = require('../../db');

const HandlerUserInfoRouter = async (req, res) => {
    const { method, path, query } = req;
    if (method === "POST") {
        if (path === "/api/userInfo/addUser") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            })

            req.on("end", async () => {
                const { name, age, sex, qq, phone } = JSON.parse(data);
                let querySql = `select * from userInfo where name="${name}"`;
                let result = await dbQuery(querySql);
                let length = result.length;
                console.log(querySql);
                console.log(result, length);
                
                if (!length) {
                    let sql = `insert into userInfo(name, age, sex, qq, phone) values(?,?,?,?,?)`;
                    let sql2 = [name, age, sex, qq, phone];
                    await dbQuery(sql, sql2);
                    res.end(JSON.stringify({ code: 200, msg: '添加成功！' }));
                    return;
                }
                res.end(JSON.stringify({ code: 400, msg: '已有该用户信息！' }));
            })
        }
    }
    if (method === "GET") {
        if (path === "/api/userInfo/getList") {
            let sql = 'select * from userInfo';
            return dbQuery(sql);
        }
    }
}

module.exports = HandlerUserInfoRouter;