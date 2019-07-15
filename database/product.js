const db = require('./db');
const Product = db.Product;

let save = (obj) => {
    return new Promise((resolve, reject) => {
        obj["since"] = new Date();
        let product = new Product(obj);
        product.save((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    });
}

let all = () => {
    return new Promise((resolve, reject) => {
        Product.find({}, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

let destroy = (id) => {
    return new Promise((resolve, reject) => {
        Product.deleteOne({ _id: id }, err => {
            if (err) {
                reject(err);
            } else {
                resolve("Ok");
            }
        })
    })
};

let paginate = (start, count) => {
    var options = {
        sort: { _id: 1 },
        lean: true,
        page: start,
        limit: count
    };
    console.log("Start : ", start, " Count : ", count);
    return new Promise((resolve, reject) => {
        Product.paginate({}, options, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    save,
    all,
    destroy,
    paginate
}