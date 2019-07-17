let bcrypt = require('bcryptjs');

let encrypt = (pass) => {
    return new Promise((resolve, reject) => {
        let salt = bcrypt.genSaltSync(10);
        let encoded = bcrypt.hash(pass, salt);
        if (encoded != null) {
            resolve(encoded);
        } else {
            reject("Password Encod Error!");
        }

    })
};

let compare = (plain, encode) => {
    return new Promise((resolve, reject) => {
        let con = bcrypt.compare(plain, encode);
        if (con) {
            resolve(con);
        } else {
            reject(con);
        }
    })
}

module.exports = {
    encrypt,
    compare
}