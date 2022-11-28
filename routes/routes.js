const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');

const app = express();
// app.use(express);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// add myControllers
const myControl = require("../controllers/mongofunc.js");






router.get("/profile/:userID", (req, res) => {
  myControl.getItem(req, res, "profile");
  // res.send("hello")
});



router.get("/profile", (req, res) => {
  myControl.getItem(req, res, "profile");
  // res.send("hello")
});


router.get("profile/edit/:userID", (req, res) => {
  myControl.getItem(req, res, "edit", "Edit username: ");
});

router.post("views/profile/edit", (req, res) => {
  myControl.amendItem(req, res);
});


router.post("profile/delete/:userID", (req, res) => {
  myControl.deleteItem(req, res);
});




//post route to log in to CrawlSpace
router.get("/login", urlencodedParser, (req, res) => {
  console.log("posted to login")
  console.log(req.body)
  myControl.login(req, res);
});




// link in burger menu to homepage 
router.get("/home", (req, res) => {
  return res.render("home", {
    title: "Homepage",
    myHeading: "My Crawls",
    myHeading2: "Suggested Crawls",
    msg2 :"Crawl into the weekend"
    
  });
});




// // example user server side validation via "express-validator"
// router.post("/login", urlencodedParser,  

// (req, res) => {
//   console.log("login")
//  const errors = validationResult(req);
//  if (!errors.isEmpty()) {
//    //return res.status(400).json({ errors: errors.array() });
//    let erArray = errors.array();
//    let erMsg = `${erArray[0].param} error - ${erArray[0].msg}` 
//    //return res.redirect("/login")
//    return res.render("login", {
//                title: "Login",
//               //  loginMsg: erMsg,
//               //  login: req.session.login,
//              });
//  }
//  myControllers.login(req, res);
// });











// link in burger menu to homepage 
router.get("/home", (req, res) => {
  return res.render("home", {
    title: "Homepage",
    myHeading: "My Crawls",
    myHeading2: "Suggested Crawls",
    msg2 :"Crawl into the weekend"
    
  });
});



//link to log out
router.get("/logout", (req, res) => {
  res.clearCookie("userName")
  // document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  return res.redirect('http://localhost:3000/', 301, {
  
    
  });
});

// router.get("/login", (req, res) => {
//   return res.render("login", {
//     title: "Crawl Space",
//     myHeading: "Login",
//     msg2 :"Crawl into the weekend"
//   });
// });

//get route to render signup page
router.get("/signup", (req, res) => {
  return res.render("signup", {
    title: "Crawl Space",
    myHeading: "Sign Up",
    msg2 :"Crawl into the weekend"
  });
});


module.exports = router;
