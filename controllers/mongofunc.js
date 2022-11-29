// VIEW CONTROLLER

const dbo = require("../mongodb/data");

var ObjectId = dbo.getObjectId();

// for encryption
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  index: function (req, res) {
    console.dir(req.session);
    return res.render("index", {
      title: "Welcome",
      message: "Demo Node Site.",
    });
  },

  main: function (req, res) {
    return res.render("main", {
      title: "EJS Example from Parts",
      message: "Hello Template built in parts",
      showMsg: true,
      headingOne: "Page made from parts",
    });
  },

  getItem: async function (req, res, view) {
    console.info("Get Item controller");
    let userID = req.params.userID;
    console.info("userID" + userID);
    var o_id = new ObjectId(userID);
    console.info(o_id);
    dbo
      .getDb()
      .collection("customers")
      .find({ _id: o_id })
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        console.dir(docs);
        // return res.send("hello");
        return res.render(view, {
          title: "Oli",
          user: docs[0],
          user_id: userID,
        });
      });
  },

  login: function (req, res) {
    // console.dir(req.body);
    let username = req.body.username;
    let password = req.body.password;
    
    dbo
      .getDb()
      .collection("customers")
      .find({ username: username })
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        if (docs.length > 0) {
          ///////
          bcrypt.compare(
            password,
            docs[0].userpassword,
            function (err, result) {
              console.info(result);
              if (result == true) {
                res.redirect("/home/" + docs[0]._id);
              } else {
                return res.render("login", {
                  title: "Login",
                  loginMsg: "Sorry Invalid Password",
                });
              }
            }
          );
        } else {
          return res.render("login", {
            title: "Login",
            loginMsg: "Sorry Invalid User",
          });
        }
      });
  },



deleteItem: function (req, res) {
  console.info("Delete Form controller");
  var formData = req.body;
  let userID = formData.userID;
  var o_id = new ObjectId(userID);
  console.info(userID);
  console.dir(o_id);
  dbo
    .getDb()
    .collection("customers")
    .deleteOne({ _id: o_id }, function (err, dbResp) {
      if (err) {
        console.error(err);
      }
      console.dir(dbResp);
      if (dbResp.deletedCount == 1) {
        res.redirect("/");
      } else {
        res.redirect("/error");
      }
    });
},

}
