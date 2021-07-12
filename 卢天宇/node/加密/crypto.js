const crypto = require('crypto');

let a = crypto.createHash("sha1").update("28582841").digest('base64');
console.log(a);