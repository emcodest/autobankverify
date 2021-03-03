var express = require('express');
var router = express.Router();
var hl = require("../lib/Handler")
var jwt = require("jsonwebtoken")
// var api_handler = require("../lib/Api")
const secret = 'secretguy'
//------------------------------VERIFY LOGIN
var VerifyLogin = async function (req, res, next) {
 
    //console.log("LoginEma middleware -------------", req.url) 
    //:  DON'T AUTH THIS ROUTES 
    const no_auth = ["/Login", "/RegisterUser", "/ForgotPassword"]
    //res.send("AmLogged")
    //return
    //: GET AUTH VALUE
    // Authorization: Bearer <access_token>
    if(! no_auth.includes(req.url)){

      const authVal = req.headers["authorization"]
      //console.log('======AUTH VAL====', authVal)
     if(! authVal){
 
       
         res.sendStatus(403)
         return
 
     }
     req.token = authVal.split(" ")[1]
     console.log('====BEARER JWT TOKEN======', req.token)
 
     next()

    }else{
      next()

    }
   
}
router.get('/', VerifyLogin, function (req, res, next) {

  res.send("API endpoint")
 
})

router.get('/:method', VerifyLogin, function(req, res, next) {
  
   //! - - - - - - - - - -- - - - - - -DYNAMICALLY CALL FUNCTIONS
   const lib = require("../lib/Api")
   var fxn = lib[req.params.method]
   if (typeof fxn !== "function") {
     res.send('Function not implemented on the server')
   }
   
   fxn.apply(null, [req, res, secret, jwt])

});
router.post('/:method', VerifyLogin, function(req, res, next) {
  
   //! - - - - - - - - - -- - - - - - -DYNAMICALLY CALL FUNCTIONS
   const lib = require("../lib/Api")
   var fxn = lib[req.params.method]
   if (typeof fxn !== "function") {
     res.send('Function not implemented on the server')
   }
   
   fxn.apply(null, [req, res, secret, jwt])

});




module.exports = router;
