const http = require('http');
const querystring = require('querystring');

module.exports = {
    async ioc_zqy(params) {
        const { url, authorization } = params;
        return new Promise((resolve, reject) => {
            http.get(url, {
                authorization
            }, res => {
                let str = "";
                res.on('data', (data) => {
                    str += data;
                });

                res.on('end', () => {
                    str = JSON.parse(str);
                    resolve(str);
                })
            })
        })
    },
    getList(e) {
        return e;
    },
    setCount(e) {
        return new Promise((resolve, reject) => {
            let obj = {
                p_id: "8c449b0e968e4cefa650e628c9e2f9d8"
            };
            let strObj = JSON.stringify(obj);
            // console.log(Buffer.byteLength(strObj))
            let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5LCJhY2NvdW50IjoiR3VpU3UiLCJ1c2VybmFtZSI6IuW9kuWuv-OAgiIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoibm9ybWFsIn0sImlhdCI6MTYyNDk0NjcwMywiZXhwIjoxNjI1NTUxNTAzfQ.BhhsfLegAMEuG9FJP47NhTEYi7YhxgFw5KCYodFB0c0";
            let options = {
                // host: 'dhwork.top',
                host: 'u1talk.com',
                // host: "developer.mozilla.org",
                // host: 'www.baidu.com',
                path: "/api/post_count?p_id=8c449b0e968e4cefa650e628c9e2f9d8",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Content-Length': Buffer.byteLength(strObj)
                },
                token,
            }
            let req = http.request(options, (res) => {
                let resData = "";
                res.on("data", data => {
                    resData += data;
                })

                res.on('end', () => {
                    let obj = {
                        data: resData
                    }
                    resolve(obj)
                })
            })

            // console.log(req['rawHeaders']);

            req.on('error', (data) => {
                console.log("请求出错！");
                console.log(data);
                req.end();
            })

            // req.write(strObj);
            console.log(req);
            req.end();
        })
        // return new Promise((resolve, reject) => {
        //     http.get('http://www.baidu.com', res => {
        //         let str = "";
        //         res.on('data', (data) => {
        //             console.log(data);
        //             str += data;
        //         });

        //         res.on('end', () => {
        //             console.log(str);
        //             // str = JSON.stringify({ data: str });
        //             str = { data: str };
        //             console.log("------");
        //             console.log(str);
        //             resolve(str);
        //         })
        //     })
        // })
    }
}