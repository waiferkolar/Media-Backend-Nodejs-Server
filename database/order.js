let db = require('./db');
let Order = db.Order;
let Product = require('./product');

let all = () => {
    return new Promise((resolve, reject) => {
        Order.find({}, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    })
}
let save = (obj) => {
    return new Promise((resolve, reject) => {
        obj['since'] = Date.now();
        let order = new Order(obj);
        order.save((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
};

let findOrderById = (id) => {
    return new Promise((resolve, reject) => {
        Order.findById(id, (err, data) => {
            if (err) {
                reject(err);
            } else {
                let ords = JSON.parse(data.ords);
                let products = [];
                let i = 0;
                for (let key in ords) {
                    Product.findProductById(key)
                        .then(res => {
                            i++;
                            res['__v'] = ords[key];
                            console.log(res);
                            products.push(res);
                            if (i == Object.keys(ords).length) {
                                resolve(products);
                            }
                        })
                        .catch(error => console.log(error));
                }
            }

        })
    })
}


module.exports = {
    save,
    findOrderById,
    all
}