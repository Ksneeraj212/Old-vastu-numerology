const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.login = async(req,res) =>{
  try{
    const{username, password} = req.body;
    console.log(req.body);
    if(!username || !password){
      return res.status(400).render('login',{
        msg: "Please Enter your Username & Password" ,msg_type:"error",
      });
    }
    db.query("SELECT * FROM numerology.signup WHERE username=?",[username],
    async(error,result) =>{
      console.log(result);
       if(result.length <= 0 ){
        return res.status(401).render("login",{
          msg:"Username or password Incorrect",
          msg_type:"error"
        });
       } else {
        if(!(await bcrypt.compare(password, result[0].password))){
          return res.status(401).render("login",{
            msg:"Please Enter Your Username & password",
            msg_type:"error",
          });
        } else {
          res.render("Numero");
        }
      }
    }
  );
  }catch(error){
    console.log(error);
  }
};
exports.register = (req, res) => {
  const { name, username, Email, phone, password, confirmpassword } = req.body;
  db.query(
    "SELECT Email FROM numerology.signup WHERE email=?",
    [Email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.render("register", { msg: "Email id already taken" ,msg_type:"error"});
      } else  if (password !== confirmpassword){
        return res.render("register", { msg: "Password doesnot match" ,msg_type:"error"});
      }
      let hashedPassword = await bcrypt.hash(password,8);
      db.query('INSERT INTO numerology.signup (name, username, Email, Phonenumber, password, confirmpassword) VALUES (?, ?, ?, ?, ?, ?)',
      [name, username, Email, phone, hashedPassword, hashedPassword],
      (error,result) => {
        if(error){
        console.log(error);
      } else {
        console.log(result);
        // return res.render("register",{msg:"User Registration Success",msg_type:"good"});
        return res.render('login');
      }}
      );
    }
  );
};


