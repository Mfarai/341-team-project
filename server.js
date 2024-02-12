const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const mongodb = require('./data/database');
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, OPTION, DELETE"
    );
    next();
})
app.use('/', require('./routes/index.js'));

mongodb.initDb((err, mongDB) => {
    if (err) {
        console.log(err);
        process.exit(1); // exit the process if there is an error
    } else {
        app.listen(port, () => {
            console.log(`database is listening and node running on port ${port}`);
        }).on('error', (err) => {
            console.log(`Error starting server: ${err}`);
            process.exit(1); // exit the process if there is an error
        });
    }
});