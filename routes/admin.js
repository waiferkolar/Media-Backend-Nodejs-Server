let multer = require('multer');
let Gallery = require('../database/gallery');
let Product = require('../database/product');
let Cat = require('../database/cat');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})
var upload = multer({ storage: storage });

module.exports = (express, passport) => {
    let router = express.Router();

    router.post('/image/upload', passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res, next) => {
        let obj = {
            name: req.file.filename
        };
        Gallery.save(obj)
            .then(result => res.json({ con: true, msg: req.file.filename }))
            .catch(err => res.json({ con: false, msg: err }));
    });
    router.post('/product/create', passport.authenticate('jwt', { session: false }), (req, res) => {
        let Obj = {
            cat_id: req.body.cat_id,
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            description: req.body.description
        };
        Product.save(Obj)
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }));
    })

    router.get('/product/paginate/:start/:count', passport.authenticate('jwt', { session: false }), (req, res) => {
        let start = req.param("start");
        let count = req.param("count");
        Product.paginate(Number(start), Number(count))
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }));
    });

    router.get('/cat/all', passport.authenticate('jwt', { session: false }), (req, res) => {
        Cat.all()
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }));
    });
    router.get('/gallery/all', passport.authenticate('jwt', { session: false }), (req, res) => {
        Gallery.all()
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }));
    })

    return router;
}