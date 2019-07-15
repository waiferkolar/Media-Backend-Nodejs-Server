require('dotenv').config();
let express = require('express'),
    app = express();

let cat = require('./database/cat');
/*
const seeder = require('./database/seeder');
seeder.seedCat();
*/

cat.all()
    .then(res => console.log(res))
    .catch(err => console.log(err));


app.listen(process.env.PORT, () => {
    console.log("Server is running at ", process.env.PORT);
});
