const net = require('net');

const PORT = 8123;
var options = {
    allowHalfOpen: false,
    pauseOnConnect: false
}

// 例子 1 
// net.createServer((socket) => {
//     console.log('监听器已启动');
//     // console.log(socket);
//     const { server } = socket;

//     // console.log(socket);

//     socket.on('listening', () => {
//         console.log('开始监听');
//     });

//     socket.on('data', (data) => {
//         console.log('data,数据来咯');
//         // console.log(Buffer.parse(data));
//         console.log(data.toString());
//         socket.write('xxx')
//     })

//     socket.on('connect', () => {
//         console.log('connect,已经连接上了!');
//     })

//     socket.on('error', (err) => {
//         console.error('error,连接失败：', err);
//     })

//     socket.on('end', () => {
//         console.error('end,接收数据成功');
//     })

//     socket.on('close', () => {
//         console.log('close,已取消链接');
//         socket.write('已取消链接');
//     })

//     // socket.write('成功链接');
//     // 获取到已连接服务的数量
//     server.getConnections((err, connections) => {
//         if (err) {
//             console.warn(err);
//             return;
//         }
//         console.log(`已经有${connections}个链接`);
//     });

// }).listen(PORT, () => {
//     console.log(`已经开启服务：端口号:${PORT}`);
// })

// 例子 2

const socket = net.createServer(options);

socket.on('listening', () => {
    console.log('开始监听');
});

socket.on('connection', (socket) => {
    console.log('链接已经建立');

    socket.on('listening', () => {
        console.log('开始监听');
    });

    socket.on('data', (data) => {
        console.log('data,数据来咯');
        // console.log(Buffer.parse(data));
        console.log(data.toString());
        //掩码键，占4个字节
        let maskingKey = data.slice(2, 6);
        //载荷数据，就是客户端发送的实际数据
        let payloadData = data.slice(6);
        console.log(maskingKey);
        console.log(payloadData);
        console.log('客户端发送的实际数据', payloadData.toString('utf8'));

        socket.write('xxx')
    })

    socket.on('connect', () => {
        console.log('connect,已经连接上了!');
    })

    socket.on('error', (err) => {
        console.error('error,连接失败：', err);
    })

    socket.on('end', () => {
        console.error('end,接收数据成功');
    })

    socket.on('close', () => {
        console.log('close,已取消链接');
        socket.write('已取消链接');
    })
})

socket.listen(PORT);
