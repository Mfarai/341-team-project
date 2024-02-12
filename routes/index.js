
const router = require('express').Router();

router.use("/", require("./swagger"));

router.use('/users', require('./users'));

router.use('/destination', require('./destination'));

router.use('/reviews', require('./reviews'));

router.use('/trips', require('./trips'));

router.get("/", (req, res) => {
  //#swagger.tags = ["Hello World"]
  res.send("WELCOME TO TEAM PROJECT");
});

module.exports = router;