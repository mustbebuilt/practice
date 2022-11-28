// VIEW CONTROLLER

// var ObjectId = require("mongodb").ObjectId;
const { json } = require("express");
const { LEGAL_TCP_SOCKET_OPTIONS } = require("mongodb");
// const { url } = require("inspector");
const MongoClient = require('mongodb').MongoClient;
const dbo = require("../mongodb/data");
var ObjectId = dbo.getObjectId();



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
    console.info(userID)
    var o_id = new ObjectId(userID);
    console.info(o_id)
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
    MongoClient.connect(
      dbo,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      async (err, client) => {
        if (err) {
          return console.log(err)
        }
        // specify the database and collection to access and update customer data
        const db = client.db('pubsDB')
        console.log(`MongoDB Connected: ${url}`)
        const customers = db.collection('customers')
        //finding user information for database 
        if (await customers.findOne({username : req.body.username})) {
          console.log("user exists")
          // retrieving and comparing user password to password stored in the database
          const customerInfo = await customers.findOne({username : req.body.username})
          const hashInDb = customerInfo.password
          bcrypt.compare(req.body.password, hashInDb, function(err, result) {
            if (result) {
              res.redirect('/home/:userID') // if login is successful, user is redirected to homepage
            } else {
              res.send("error: invalid credentials - please try again") // error is presented to user if password is incorrect
            }
          });
        } 
        else {
        console.log("user not found")
        res.redirect("/signup") // if the user does not have an account, they are redirected to the signup page
        };
       })
    },


  // getItem: async function (req, res, view) {
  //   console.info("Get Item controller");
  //   // let userID = req.params.userID;
  //   // var o_id = new ObjectId(userID);

  //   // dbo
  //   //   .getDb()
  //   //   .collection("customers")
  //   //   .find({ _id: o_id })
  //   //   .toArray(function (err, docs) {
  //   //     if (err) {
  //   //       console.error(err);
  //   //     } 
  //   //     console.dir(docs);
  //       return res.render(view, {
  //         userid: 1234,
  //         // title: `${viewUsername} ${docs[0].username}`,
  //         // userid: docs[0],
  //       });
  //     // });
  // },








}