let formidable = require('express-formidable');
require('dotenv').config();
let express = require('express'),
    app = express(),
    jwt = require('jsonwebtoken'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require('./database/user'),
    path = require('path'),
    cors = require('cors');

let seeder = require('./database/seeder');
let db = require('./database/db');
let Order = require('./database/order');

// seeder.seedCat();
// seeder.seedProduct();

// db.dropColle('products')
//     .then(res => console.log(res))
//     .catch(err => console.log(err));

let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET;

let myStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
    let email = payload.email;
    let name = payload.name;
    User.findByEmail(email)
        .then(user => {
            if (user.name == name) {
                done(null, user);
            }
        })
        .catch(err => done(err, null));
});

// Order.findOrderById(9)
//     .then(res => console.log(res))
//     .catch(err => console.log(err));

let userRoute = require("./routes/user")(express, jwt);
let adminRoute = require('./routes/admin')(express, passport);
let guestRoute = require('./routes/guest')(express);

app.use(express.static(path.join(__dirname, './assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
passport.use(myStrategy);
app.use(formidable());
var corsOptions = {
    origin: 'http://178.128.25.33/',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/", guestRoute);

app.listen(process.env.PORT, () => {
    console.log("Server is running at ", process.env.PORT);
});
