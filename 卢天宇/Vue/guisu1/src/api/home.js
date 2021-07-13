import db from './db.js';

function userInfo() {
    db.query('select * from userInfo', (err, result, fields) => {
        if (err) {
            console.log(err);
            return err;
        }
        console.log(result);
        console.log(fields);
        return result;
    })
}


const api = {
    userInfo
}

export default api;