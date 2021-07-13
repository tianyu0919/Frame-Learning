// const net = require('net');
// console.log(net);
// socket = new net.Socket();
// console.log(socket);
// http://121.199.51.117:8083/api/v1/parking/interface/getParkingAmount
const http = require('http');
const { URL } = require('url');
const src = new URL('http://121.199.51.117:8083/api/v1/parking/interface/getParkingAmount');
// console.log(src)

// console.log(http);

const options = {
    hostname: '121.199.51.117',
    path: "/api/v1/parking/interface/getParkingAmount",
    port: 8083,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
}
console.log(options);

const req = http.request(options, (res) => {
    let data = "";

    res.on('data', (chunk) => {
        data += chunk;
        console.log(chunk);
    });

    res.on('end', () => {
        console.log(JSON.parse(data));
    })
});
// console.log(req);

req.on("error", (err) => {
    console.log('报错了！');
    console.log(err);
})

req.end();