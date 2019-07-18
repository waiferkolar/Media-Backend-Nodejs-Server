const mongoose = require('mongoose');
let url = "mongodb://localhost:27017/mediaDB"
const connect = mongoose.connect(url, { useNewUrlParser: true });
const autoincrement = require('mongoose-auto-increment');
autoincrement.initialize(mongoose.connection);
const mongoosePaginate = require('mongoose-paginate');

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

let UserScheme = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    since: { type: Date, require: true },
})

let GalleryScheme = new Schema({
    name: { type: String, required: true }
});

let dropColle = (colle) => {
    let db = mongoose.connection;

    return new Promise((resolve, reject) => {
        db.dropCollection(colle, (err, result) => {
            if (err) reject(err);
            resolve(colle + " removed!");
        })
    })
}

let Cat = mongoose.model('category', CatScheme);
ProductScheme.plugin(autoincrement.plugin, 'product');
ProductScheme.plugin(mongoosePaginate);
let Product = mongoose.model('product', ProductScheme);
let User = mongoose.model('user', UserScheme);
GalleryScheme.plugin(autoincrement.plugin, 'gallery');
let Gallery = mongoose.model('gallery', GalleryScheme);

module.exports = {
    Cat,
    Product,
    User,
    Gallery,
    dropColle
}