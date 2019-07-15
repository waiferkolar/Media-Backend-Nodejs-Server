let db = require('./db');
let User = db.User;

let save = (obj) => {
    return new Promise((resolve, reject) => {
        obj["since"] = new Date();
        let user = new User(obj);
        user.save((err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
}

let all = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
};

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
};

let findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({ "email": email }, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    save,
    all,
    findUserById,
    findByEmail
}