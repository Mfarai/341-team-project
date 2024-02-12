
const router = require('express').Router();

router.use("/", require("./swagger"));

router.use('/users', require('./users'));

router.get("/", (req, res) => {
  //#swagger.tags = ["Hello World"]
  res.send("Hello World");
});

module.exports = router;