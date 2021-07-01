
const token = "catarc-eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI0NSIsInN1YiI6ImFkbWluIiwiaWF0IjoxNjI0ODcwMTczLCJpc3MiOiJjYXRhcmMiLCJhdXRob3JpdGllcyI6IltdIiwiZXhwIjoxNjI0OTU2NTczfQ.ixQ4W-gBpyRdgzOwCmYRsBnycSc_8M49uHLHBV4fkmbsF26ThqsGw26pYGay3kiltFFfvHSWnuDr6TmQT9ZRGw";
const url = 'http://47.103.46.222:8006/sjls/base/avlgztc2/';
let btn1 = document.querySelector('#btn1');
let btn2 = document.querySelector('#btn2');
let btn3 = document.querySelector('#btn3');
let btn4 = document.querySelector('#btn4');
let container = document.querySelector("#container");

btn1.addEventListener('click', (ev) => {
    console.log('xx')
    fetch('/api/ioc_zqy', {
        method: "POST",
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: JSON.stringify({
            url: 'http://47.103.46.222:8006/sjls/base/avlgztc2/',
            authorization: token
        })
    }).then(res => {
        console.log(res);
        return res.json()
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    });
})


btn2.addEventListener('click', (ev) => {
    fetch(`/api/getList`, {
        method: "POST",
        headers: {
            'content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            url: 'http://47.103.46.222:8006/sjls/base/avlgztc2/',
            authorization: token
        })
    }).then(res => res.json()).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
})


btn3.addEventListener('click', (ev) => {
    fetch('http://localhost:1121/api/setCount', {
        method: "POST",
        headers: {
            'content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ xx: 'xxx' })
    }).then(res => {
        console.log(res);
        return res.json()
    }).then(res => {
        console.log(res)
        const { data } = res;
        console.log(data);
        console.log(container);
        container.innerText = res.data;
    }).catch(err => {
        console.log(err)
    })
})


btn4.addEventListener('click', (ev) => {
    fetch('http://localhost:1121/api/userInfo/user', {
        method: "POST",
        headers: {
            'content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ xx: 'xxx' })
    }).then(res => {
        console.log(res);
        return res.json()
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
})