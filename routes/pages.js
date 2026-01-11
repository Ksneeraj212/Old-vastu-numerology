const express = require("express");
const router = express.Router();

router.get("/" , (req,res) => {
  res.render("login");
});

router.get("/login" , (req,res)=> {
  res.render("login");
})
router.get("/register", (req,res)=>{
  res.render("register");
})
router.get("/Numero" , (req,res) => {
  res.render("Numero");
});

module.exports = router;