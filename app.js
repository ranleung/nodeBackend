var express    = require("express");
var bodyParser = require("body-parser");
var db         = require('./models/index.js');
var app        = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

require("locus");

router.get("/", function(req, res) {
  // eval(locus)
  res.json({message: "Welcome to our API!"})
})

//Register the routes
app.use('/api', router);

//Start the server
app.listen(process.env.PORT || 3000, function(){
  console.log("Party Just Started on localhost:3000");  
});