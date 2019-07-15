const mongoose = require('mongoose');
let url = "mongodb://localhost:27017/mediaDB"
const connect = mongoose.connect(url, { useNewUrlParser: true });
const autoincrement = require('mongoose-auto-increment');
autoincrement.initialize(mongoose.connection);

let Schema = mongoose.Schema;

let CatScheme = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    since: { type: Date, require: true }
});

let ProductScheme = new Schema({
    cat_id: { type: Number, require: true },
    name: { type: String, require: true },
    price: { type: Number, require: true },
    image: { type: String, require: true },
    description: { type: String, require: true },
    since: { type: Date, require: true }
});

let Cat = mongoose.model('category', CatScheme);
ProductScheme.plugin(autoincrement.plugin, 'product');
let Product = mongoose.model('product', ProductScheme);

module.exports = {
    Cat,
    Product
}