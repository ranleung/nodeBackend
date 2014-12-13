var express    = require("express");
var bodyParser = require("body-parser");
var db         = require('./models/index.js');
var app        = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

require("locus");

router.use(function(req, res, next){
  console.log("Something is happening.");
  next();
});

router.get("/", function(req, res){
  // eval(locus)
  res.json({message: "Welcome to our API!"})
});

router.route("/names")
  .get(function(req,res){
      db.User.findAll().then(function(data){
        res.json({message: data})
      })
    })
  .post(function(req, res){
    db.User.create({first_name: req.body.first_name, last_name: req.body.last_name, age: req.body.age}).then(function(data){
      res.json({message: "A User was created"});
    });
  });
  
router.route("/names/:id")
  .get(function(req,res){
    db.User.find({
      where: {
        id: req.params.id
      }
    }).then(function(data){
      console.log(req.param.id)
      res.json({user: data})
    })
  })
  .put(function(req,res){
    db.User.find({
      where: {
        id: req.params.id
      }
    }).then(function(user){
      user.updateAttributes({
        first_name: req.body.first_name
      }).success(function(data){
        res.json({message: data})
      })
    })
  })
  .delete(function(req,res){
    db.User.find({
      where: {
        id: req.params.id
      }
    }).then(function(user){
      user.destroy().success(function(data){
        res.json({status: "Deleted Successfully"})
      })
    })
  })

//Register the routes
app.use('/api', router);

//Start the server
app.listen(process.env.PORT || 3000, function(){
  console.log("Party Just Started on localhost:3000");  
});