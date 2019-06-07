//[Package]
//Express
const express = require("express");
//Mongoose
var mongoose = require("mongoose");
//Body-parser
var bodyParser = require("body-parser");
//Bcryptjs
var bcrypt = require("bcryptjs");
//Path
var path = require("path");
//Cookie
var cookieParser = require("cookie-parser");
//Session
var session = require("express-session");

//[Connect database]
mongoose.connect(
  "mongodb+srv://simulator:simulator@cluster0-eksdr.mongodb.net/db1"
);

//[Init]
const PORT = process.env.PORT || 5000;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//[Schema]
//User schema
var UserSchema = new mongoose.Schema({
  loginId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  itemList: [mongoose.Schema.Types.Mixed],
  goodsList: [mongoose.Schema.Types.Mixed],
  money: { type: Number },
  customers: { type: Number }
});

var User = mongoose.model("User", UserSchema);

//[Session]
app.use(
  session({
    key: "user_sid",
    secret: "simulator",
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 3000 * 1000
    }
  })
);

//Clear unintended session
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

//[Query]

//Check for logged-in users
app.get("/login", function(req, res) {
  if (req.session.user && req.cookies.user_sid) {
    User.findOne(
      {
        loginId: req.session.user
      },
      function(err, result) {
        if (err) {
          res.json({ user: "NOT" });
        }
        if (result) {
          res.json({ user: req.session.user });
        } else {
          res.clearCookie("user_sid");
          res.json({ user: "NOT" });
        }
      }
    );
  } else {
    res.json({ user: "NOT" });
  }
});

//User logout
app.get("/logout", function(req, res) {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.send("done");
  } else {
    res.redirect("/");
  }
});

//New account
app.post("/newAccount", function(req, res) {
  var u = new User({
    loginId: String(req.body["loginId"]),
    password: String(bcrypt.hashSync(req.body["password"])),
    itemList: [{item: "▤", pos: [1,1]}, {item: "▤", pos: [2,1]}, {item: "▤", pos: [3,1]}, {item: "▣", pos: [5,1]}, {item: "◪", pos: [7,6]}],
    goodsList: [{name: "三文治", price: 10.2, number: 2}, {name: "水", price: 5.2, number: 3}, {name: "薯片", price: 6.2, number: 4}],
    money: 0,
    customers: 0
  });
  u.save(function(err) {
    if (err) {
      res.send(err.errmsg);
    } else {
      res.send("成功註冊! 你的帳號為: " + req.body["loginId"]);
    }
  });
});


//Login
app.post("/checkUser", function(req, res) {
  User.findOne(
    {
      loginId: String(req.body["id"])
    },
    function(err, result) {
      if (err) {
        res.send(err);
      }
      if (result) {
        if (bcrypt.compareSync(req.body["pw"], result.password)) {
          req.session.user = req.body["id"];
          res.send("0"); // Both Id & pw are right
        } else {
          // Id is right, not pw
          res.send("1");
        }
      } else {
        //!result = no id matching in db
        res.send("2");
      }
    }
  );
});

//Give user's shop details
app.get("/shopDetails", function(req, res){
  if(req.session.user && req.cookies.user_sid){
    User.findOne({
      loginId: req.session.user
    }, function(err, result){
      var item = {itemList: result.itemList, goodsList: result.goodsList, money: result.money, customers: result.customers};
      res.json(item);
    });
  }else{
    var item = {itemList: [{item: "▤", pos: [1,1]}, {item: "▤", pos: [2,1]}, {item: "▤", pos: [3,1]}, {item: "▣", pos: [5,1]}, {item: "◪", pos: [7,6]}], 
                goodsList: [{name: "三文治", price: 10.2, number: 2}, {name: "水", price: 5.2, number: 3}, {name: "薯片", price: 6.2, number: 4}], 
                money: 0, 
                customers: 0};
    res.json(item);
  }
});

//Save game
app.post("/updateGame", function(req, res){
  if(req.session.user && req.cookies.user_sid){
    User.update({loginId: req.session.user }, {
      $set: {
        money: req.body["money"],
        customers: req.body["customers"]
      }
    }, function(err) {
      if(err){
        res.send(err.errmsg);
      }else{
        res.send("Done!");
      }
    });
  }else{
    res.send("Do nothing");
  }
});

/*

//Update user information
app.post("/changeuser", function(req, res) {
  if (req.session.user && req.cookies.user_sid) {
    User.update(
      { loginId: req.session.user },
      {
        $set: {
          loginId: req.body["newloginId"],
          password: String(bcrypt.hashSync(req.body["newpassword"]))
        }
      },
      function(err) {
        if (err) {
          res.send(err.errmsg);
        } else {
          res.clearCookie("user_sid");
          res.send("Done! Please login again.");
        }
      }
    );
  } else {
    res.redirect("/");
  }
});

//Admin update user information
app.post("/adminupdateuser", function(req, res) {
  User.update(
    { loginId: req.body["oldusername"] },
    {
      $set: {
        loginId: req.body["newusername"],
        password: String(bcrypt.hashSync(req.body["newpassword"]))
      }
    },
    function(err) {
      if (err) {
        res.send(err.errmsg);
      } else {
        res.send("Done!");
      }
    }
  );
});

//User list
app.get("/userdata", function(req, res) {
  var tmp = '<li class="collection-header"><h4>Users</h4></li>';
  User.find().exec(function(err, results) {
    results.forEach(function(element) {
      tmp +=
        '<li class="collection-item avatar edituser"><i class="material-icons circle">folder</i><span class="title">';
      tmp += element.loginId;
      tmp +=
        '</span><a href="#!" class="secondary-content"><i class="material-icons">send</i></a></li>';
    });
    res.send(tmp);
  });
});

//Delete user
app.post("/deleteuser", function(req, res) {
  User.remove({ loginId: req.body["username"] }, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send("User deleted!");
    }
  });
});

//Admin page
app.get("/admin", function(req, res) {
  if (req.query["pw"] == "csci3100") {
    res.sendFile(path.join(__dirname + "/admin.html"));
  } else {
    res.redirect("/");
  }
});

//New word
app.get("/newword", function(req, res) {
  if (req.session.user && req.cookies.user_sid) {
    var word = "a";
    var misstime = 0;
    User.findOne({ loginId: req.session.user }, function(err, result) {
      //Find most mistyped word
      result.miss.forEach(function(value, key) {
        if (value > misstime) {
          misstime = value;
          word = key.toLowerCase();
        }
      });
      if (misstime == 0) {
        res.json({ word: genRandomWords(1) });
      } else {
        var chance = Math.random();
        //50% of having the mistyped word in the next word
        if (chance > 0.5) {
          var firstQuery = word + ".*" + word + ".*" + word;
          var secondQuery = word + ".*" + word;
          var thirdQuery = word;
          var newWord = genRandomWords(1, { contains: firstQuery });
          if (newWord.length == 0) {
            newWord = genRandomWords(1, { contains: secondQuery });
            if (newWord.length == 0) {
              genRandomWords(1, { contains: thirdQuery });
            }
          }
          res.json({ word: newWord });
        } else {
          res.json({ word: genRandomWords(1) });
        }
      }
    });
  } else {
    //Random gen a word for guest
    res.json({ word: genRandomWords(1) });
  }
});

*/

//Homepage
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/homepage.html"));
});

app.use("/", express.static(__dirname + "/"));

app.listen(PORT);
