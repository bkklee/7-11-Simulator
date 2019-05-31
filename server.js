//[Package]
//Express
const express = require("express");
/*//Mongoose
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
//Random-words
var randomWords = require("random-words");
//Rword
var genRandomWords = require("rword").rword.generate;

//[Connect database]
mongoose.connect(
  "mongodb+srv://csci3100:csci3100@cluster0-48aht.mongodb.net/db1"
);*/

//[Init]
const PORT = process.env.PORT || 5000;

var app = express();
/*app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());*/

/*
//[Schema]
//User schema
var UserSchema = new mongoose.Schema({
  loginId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hit: { type: Map, of: Number },
  typed: { type: Map, of: Number },
  miss: { type: Map, of: Number },
  totalHit: { type: Number },
  totalTyped: { type: Number },
  totalTime: { type: Number },
  totalWord: { type: Number },
  firstHit: { type: Number },
  firstTyped: { type: Number },
  firstWord: { type: Number }
});

var User = mongoose.model("User", UserSchema);

//[Session]
app.use(
  session({
    key: "user_sid",
    secret: "ilovecsci",
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
    hit: {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
      G: 0,
      H: 0,
      I: 0,
      J: 0,
      K: 0,
      L: 0,
      M: 0,
      N: 0,
      O: 0,
      P: 0,
      Q: 0,
      R: 0,
      S: 0,
      T: 0,
      U: 0,
      V: 0,
      W: 0,
      X: 0,
      Y: 0,
      Z: 0
    },
    typed: {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
      G: 0,
      H: 0,
      I: 0,
      J: 0,
      K: 0,
      L: 0,
      M: 0,
      N: 0,
      O: 0,
      P: 0,
      Q: 0,
      R: 0,
      S: 0,
      T: 0,
      U: 0,
      V: 0,
      W: 0,
      X: 0,
      Y: 0,
      Z: 0
    },
    miss: {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
      G: 0,
      H: 0,
      I: 0,
      J: 0,
      K: 0,
      L: 0,
      M: 0,
      N: 0,
      O: 0,
      P: 0,
      Q: 0,
      R: 0,
      S: 0,
      T: 0,
      U: 0,
      V: 0,
      W: 0,
      X: 0,
      Y: 0,
      Z: 0
    },
    totalHit: 0,
    totalTyped: 0,
    totalTime: 1,
    totalWord: 0,
    firstTyped: 0,
    firstHit: 0,
    firstWord: 0
  });
  u.save(function(err) {
    if (err) {
      res.send(err.errmsg);
    } else {
      res.send("Account created! Login Id: " + req.body["loginId"]);
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

//Get user profile
app.get("/userstat", function(req, res) {
  if (req.session.user && req.cookies.user_sid) {
    User.findOne({ loginId: req.session.user }, function(err, result) {
      res.json({
        name: result.loginId,
        hit: result.hit,
        typed: result.typed,
        totalHit: result.totalHit,
        totalTyped: result.totalTyped,
        totalTime: result.totalTime,
        totalWord: result.totalWord,
        firstHit: result.firstHit,
        firstTyped: result.firstTyped,
        firstWord: result.firstWord
      });
    });
  } else {
    res.send("Error");
  }
});

//Get hit ranking
app.get("/rankinghit", function(req, res) {
  var tmp = "";
  var count = 1;
  User.find()
    .sort({ totalHit: -1 })
    .limit(10)
    .exec(function(err, results) {
      results.forEach(function(element) {
        tmp +=
          "<tr><td>" +
          count +
          "</td><td>" +
          element.loginId +
          "</td><td>" +
          element.totalHit +
          "</td></tr>";
        count += 1;
      });
      res.send(tmp);
    });
});

//Get CPM ranking
app.get("/rankingcpm", function(req, res) {
  var tmp = "";
  var count = 1;
  User.aggregate()
    .project({
      loginId: "$loginId",
      CPM: {
        $divide: [{ $subtract: ["$totalTyped", "$firstTyped"] }, "$totalTime"]
      }
    })
    .sort({ CPM: -1 })
    .limit(10)
    .exec(function(err, results) {
      results.forEach(function(element) {
        tmp +=
          "<tr><td>" +
          count +
          "</td><td>" +
          element.loginId +
          "</td><td>" +
          Math.round(element.CPM * 1000 * 60) +
          "</td></tr>";
        count += 1;
      });
      res.send(tmp);
    });
});

//Get WPM ranking
app.get("/rankingwpm", function(req, res) {
  var tmp = "";
  var count = 1;
  User.aggregate()
    .project({
      loginId: "$loginId",
      WPM: {
        $divide: [{ $subtract: ["$totalWord", "$firstWord"] }, "$totalTime"]
      }
    })
    .sort({ WPM: -1 })
    .limit(10)
    .exec(function(err, results) {
      results.forEach(function(element) {
        tmp +=
          "<tr><td>" +
          count +
          "</td><td>" +
          element.loginId +
          "</td><td>" +
          Math.round(element.WPM * 1000 * 60) +
          "</td></tr>";
        count += 1;
      });
      res.send(tmp);
    });
});

//Get score ranking
app.get("/rankingscore", function(req, res) {
  var tmp = "";
  var count = 1;
  User.aggregate()
    .project({
      loginId: "$loginId",
      score: {
        $divide: [
          {
            $subtract: [
              { $subtract: ["$totalHit", "$firstHit"] },
              {
                $multiply: [
                  3,
                  {
                    $subtract: [
                      { $subtract: ["$totalTyped", "$totalHit"] },
                      { $subtract: ["$firstTyped", "$firstHit"] }
                    ]
                  }
                ]
              }
            ]
          },
          "$totalTime"
        ]
      }
    })
    .sort({ score: -1 })
    .limit(10)
    .exec(function(err, results) {
      if (err) {
        res.send(err.errmsg);
      } else {
        results.forEach(function(element) {
          tmp +=
            "<tr><td>" +
            count +
            "</td><td>" +
            element.loginId +
            "</td><td>" +
            Math.round(element.score * 10000) +
            "</td></tr>";
          count += 1;
        });
        res.send(tmp);
      }
    });
});

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

//Handle user mistyped word
app.post("/newmiss", function(req, res) {
  if (req.session.user && req.cookies.user_sid) {
    User.update(
      { loginId: req.session.user },
      {
        $inc: {
          "miss.A": req.body["miss[A]"],
          "miss.B": req.body["miss[B]"],
          "miss.C": req.body["miss[C]"],
          "miss.D": req.body["miss[D]"],
          "miss.E": req.body["miss[E]"],
          "miss.F": req.body["miss[F]"],
          "miss.G": req.body["miss[G]"],
          "miss.H": req.body["miss[H]"],
          "miss.I": req.body["miss[I]"],
          "miss.J": req.body["miss[J]"],
          "miss.K": req.body["miss[K]"],
          "miss.L": req.body["miss[L]"],
          "miss.M": req.body["miss[M]"],
          "miss.N": req.body["miss[N]"],
          "miss.O": req.body["miss[O]"],
          "miss.P": req.body["miss[P]"],
          "miss.Q": req.body["miss[Q]"],
          "miss.R": req.body["miss[R]"],
          "miss.S": req.body["miss[S]"],
          "miss.T": req.body["miss[T]"],
          "miss.U": req.body["miss[U]"],
          "miss.V": req.body["miss[V]"],
          "miss.W": req.body["miss[W]"],
          "miss.X": req.body["miss[X]"],
          "miss.Y": req.body["miss[Y]"],
          "miss.Z": req.body["miss[Z]"]
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
  } else {
    //Guest
    res.send("Guest");
  }
});

//Update keystroke
app.post("/updatekeystroke", function(req, res) {
  if (req.session.user && req.cookies.user_sid) {
    if (req.body["time"] == 0) {
      User.update(
        { loginId: req.session.user },
        {
          $inc: {
            "hit.A": req.body["hit[A]"],
            "hit.B": req.body["hit[B]"],
            "hit.C": req.body["hit[C]"],
            "hit.D": req.body["hit[D]"],
            "hit.E": req.body["hit[E]"],
            "hit.F": req.body["hit[F]"],
            "hit.G": req.body["hit[G]"],
            "hit.H": req.body["hit[H]"],
            "hit.I": req.body["hit[I]"],
            "hit.J": req.body["hit[J]"],
            "hit.K": req.body["hit[K]"],
            "hit.L": req.body["hit[L]"],
            "hit.M": req.body["hit[M]"],
            "hit.N": req.body["hit[N]"],
            "hit.O": req.body["hit[O]"],
            "hit.P": req.body["hit[P]"],
            "hit.Q": req.body["hit[Q]"],
            "hit.R": req.body["hit[R]"],
            "hit.S": req.body["hit[S]"],
            "hit.T": req.body["hit[T]"],
            "hit.U": req.body["hit[U]"],
            "hit.V": req.body["hit[V]"],
            "hit.W": req.body["hit[W]"],
            "hit.X": req.body["hit[X]"],
            "hit.Y": req.body["hit[Y]"],
            "hit.Z": req.body["hit[Z]"],
            "typed.A": req.body["total[A]"],
            "typed.B": req.body["total[B]"],
            "typed.C": req.body["total[C]"],
            "typed.D": req.body["total[D]"],
            "typed.E": req.body["total[E]"],
            "typed.F": req.body["total[F]"],
            "typed.G": req.body["total[G]"],
            "typed.H": req.body["total[H]"],
            "typed.I": req.body["total[I]"],
            "typed.J": req.body["total[J]"],
            "typed.K": req.body["total[K]"],
            "typed.L": req.body["total[L]"],
            "typed.M": req.body["total[M]"],
            "typed.N": req.body["total[N]"],
            "typed.O": req.body["total[O]"],
            "typed.P": req.body["total[P]"],
            "typed.Q": req.body["total[Q]"],
            "typed.R": req.body["total[R]"],
            "typed.S": req.body["total[S]"],
            "typed.T": req.body["total[T]"],
            "typed.U": req.body["total[U]"],
            "typed.V": req.body["total[V]"],
            "typed.W": req.body["total[W]"],
            "typed.X": req.body["total[X]"],
            "typed.Y": req.body["total[Y]"],
            "typed.Z": req.body["total[Z]"],
            totalHit: req.body["hitnum"],
            totalTyped: req.body["totalnum"],
            totalTime: req.body["time"],
            totalWord: 1,
            firstTyped: req.body["totalnum"],
            firstHit: req.body["hitnum"],
            firstWord: 1
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
    } else {
      User.update(
        { loginId: req.session.user },
        {
          $inc: {
            "hit.A": req.body["hit[A]"],
            "hit.B": req.body["hit[B]"],
            "hit.C": req.body["hit[C]"],
            "hit.D": req.body["hit[D]"],
            "hit.E": req.body["hit[E]"],
            "hit.F": req.body["hit[F]"],
            "hit.G": req.body["hit[G]"],
            "hit.H": req.body["hit[H]"],
            "hit.I": req.body["hit[I]"],
            "hit.J": req.body["hit[J]"],
            "hit.K": req.body["hit[K]"],
            "hit.L": req.body["hit[L]"],
            "hit.M": req.body["hit[M]"],
            "hit.N": req.body["hit[N]"],
            "hit.O": req.body["hit[O]"],
            "hit.P": req.body["hit[P]"],
            "hit.Q": req.body["hit[Q]"],
            "hit.R": req.body["hit[R]"],
            "hit.S": req.body["hit[S]"],
            "hit.T": req.body["hit[T]"],
            "hit.U": req.body["hit[U]"],
            "hit.V": req.body["hit[V]"],
            "hit.W": req.body["hit[W]"],
            "hit.X": req.body["hit[X]"],
            "hit.Y": req.body["hit[Y]"],
            "hit.Z": req.body["hit[Z]"],
            "typed.A": req.body["total[A]"],
            "typed.B": req.body["total[B]"],
            "typed.C": req.body["total[C]"],
            "typed.D": req.body["total[D]"],
            "typed.E": req.body["total[E]"],
            "typed.F": req.body["total[F]"],
            "typed.G": req.body["total[G]"],
            "typed.H": req.body["total[H]"],
            "typed.I": req.body["total[I]"],
            "typed.J": req.body["total[J]"],
            "typed.K": req.body["total[K]"],
            "typed.L": req.body["total[L]"],
            "typed.M": req.body["total[M]"],
            "typed.N": req.body["total[N]"],
            "typed.O": req.body["total[O]"],
            "typed.P": req.body["total[P]"],
            "typed.Q": req.body["total[Q]"],
            "typed.R": req.body["total[R]"],
            "typed.S": req.body["total[S]"],
            "typed.T": req.body["total[T]"],
            "typed.U": req.body["total[U]"],
            "typed.V": req.body["total[V]"],
            "typed.W": req.body["total[W]"],
            "typed.X": req.body["total[X]"],
            "typed.Y": req.body["total[Y]"],
            "typed.Z": req.body["total[Z]"],
            totalHit: req.body["hitnum"],
            totalTyped: req.body["totalnum"],
            totalTime: req.body["time"],
            totalWord: 1
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
    }
  } else {
    //Guest
    res.send("Guest");
  }
});*/

//Homepage
/*app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/homepage.html"));
});*/

/*app.use("/", express.static(__dirname + "/"));*/

app.all("/", function(req, res){
  res.send("Hello world");
});

app.listen(PORT);
