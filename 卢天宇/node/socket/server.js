const crypto = require('crypto');
const net = require('net');
var clientList = [];
var this_client = null;
var options = {
    allowHalfOpen: false,
    pauseOnConnect: false
}

let tcpServer = net.createServer(options);

//计算websocket校验
function getSecWebSocketAccept(key) {
    return crypto.createHash('sha1')
        .update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
        .digest('base64');
}

//掩码操作
function unmask(buffer, mask) {
    const length = buffer.length;
    for (var i = 0; i < length; i++) {
        buffer[i] ^= mask[i & 3];
    }
    console.log('解码后的数据', buffer.toString('utf8'));
}

tcpServer.on('listening', () => {
    console.log('开始监听');
});

tcpServer.on('connection', (socket) => {
    console.log('连接已建立' + '\n', socket);

    //启动心跳机制
    /*var isOnline = !0;
    var keepAliveTimer = socket.timer = setInterval(()=>{
    if(!isOnline){
    this_client = socket;
    quit(socket.nick);
    return;
    }
    if(socket.writable){
    isOnline = !1;
    socket.write('::');
    }else{
    this_client = socket;
    quit(socket.nick);
    }
    },3000);
    
    if(socket._handle==null){
    isOnline = !0;
    return;
    }*/

    tcpServer.getConnections((err, count) => {
        if (err) {
            console.warn(err);
        } else {
            console.log(`当前有${count}个连接`);
        }
    });

    socket.on('data', (data) => {
        this_client = socket;
        if (clientList.indexOf(socket) > -1) {

            let buffer = data;

            let fin = (buffer[0] & 0b10000000) === 0b10000000;
            //取第一个字节的后四位，得到的一个是十进制数
            let opcode = buffer[0] & 0b00001111;
            //取第二个字节的第一位是否是1，判断是否掩码操作
            let mask = buffer[1] & 0b100000000 === 0b100000000;
            //载荷数据的长度
            let payloadLength = buffer[1] & 0b01111111;
            //掩码键，占4个字节
            let maskingKey = buffer.slice(2, 6);
            //载荷数据，就是客户端发送的实际数据
            let payloadData = buffer.slice(6);
            console.log('客户端发送的实际数据', payloadData.toString('utf8'));

            //对数据进行解码处理
            unmask(payloadData, maskingKey);

            //向客户端响应数据
            let send = Buffer.alloc(2 + payloadData.length);
            //0b10000000表示发送结束
            send[0] = opcode | 0b10000000;
            //载荷数据的长度
            send[1] = payloadData.length;
            payloadData.copy(send, 2);

            var now = new Date();

            broadcast(send, socket);

            /*const buf2 = Buffer.from('后台传过来的时间：'+now, 'utf8');
            const buf=Buffer.alloc(2+buf2.length);
            buf[0]=opcode | 0b10000000;
            buf[1]=buf2.length;
            buf2.copy(buf,2);*/

            /*for(var i=0;i<clientList.length;i++){
            let client=clientList[i];
            if(client._handle==null){
            clientList.splice(clientList.indexOf(client), 1);
            i--;
            }
            }*/

            /* if(send=='end'){
            this.close();
            }
            
            for(var i=0;i<clientList.length;i++){
            console.log('剩余个数：',clientList.length);
            let client=clientList[i];
            //console.log('返回数据中---',client);
            console.log(send);
            
            client.write(send);
            }*/

        } else {
            data = data.toString();
            if (data.match(/Upgrade: websocket/)) {
                let rows = data.split('\r\n');
                //去掉第一行的请求行
                //去掉请求头的尾部两个空行
                rows = rows.slice(1, -2);
                let headers = {};
                rows.forEach(function (value) {
                    let [k, v] = value.split(': ');
                    headers[k] = v;
                });
                //判断websocket的版本
                if (headers['Sec-WebSocket-Version'] == 13) {
                    let secWebSocketKey = headers['Sec-WebSocket-Key'];
                    //计算websocket校验
                    let secWebSocketAccept = getSecWebSocketAccept(secWebSocketKey);
                    console.log(secWebSocketAccept);
                    //服务端响应的内容
                    let res =
                        'HTTP/1.1 101 Switching Protocols \r\n' +
                        'Upgrade: websocket \r\n' +
                        'Sec-WebSocket-Accept: ' + secWebSocketAccept + '\r\n' +
                        'Connection: Upgrade \r\n' +
                        '\r\n';

                    console.log('发送给客户端协议', res);
                    //给客户端发送响应内容
                    socket.write(res);
                    //socket.name = socket.remoteAddress + ':' + socket.remotePort;
                    clientList.push(socket);
                }
            }
        }
    });

    socket.on('disconnect', function () { // 这里监听 disconnect，就可以知道谁断开连接了
        console.log('disconnect: ' + socket.id);
    });

    socket.on('error', (err) => {
        console.warn('错误', err);
        socket.destroy();
    });

    /*socket.on('close', function(data) {
    console.log('客户端关闭了!',data);
    //clientList.splice(clientList.indexOf(socket), 1);
    // socket.remoteAddress + ' ' + socket.remotePort);
    });*/

    //结束
    socket.on('end', () => {
        console.log('' + socket + '-quit'); //如果某个客户端断开连接，node控制台就会打印出来
        //this.destroy();
        clientList.splice(clientList.indexOf(socket), 1);
    });

    function broadcast(message, client) {
        var cleanup = []; //断开了的客户端们
        for (var i = 0; i < clientList.length; i++) {

            //检查socket的可写状态
            if (clientList[i].writable) {
                // 把数据发送给其他客户端
                if (message.toString().length > 2) {
                    clientList[i].write(message);
                }
            } else {
                cleanup.push(clientList[i]);
                clientList[i].destroy();
            }
        }
        /*删除掉服务器的客户端数组中，已断开的客户端*/
        for (var i = 0; i < cleanup.length; i++) {
            clientList.splice(clientList.indexOf(cleanup[i]), 1);
        }
    }
});

tcpServer.on('close', () => {
    console.log('close');
});

tcpServer.listen(8124, () => {
    console.log("8124 服务器 ok");
});