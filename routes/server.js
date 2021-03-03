var express = require('express');
var router = express.Router();
var handler = require("../lib/Handler")
router.post('/:lib/:method', function(req, res, next) {
  
   //! - - - - - - - - - -- - - - - - -DYNAMICALLY CALL FUNCTIONS
   const lib = require("../lib/"+req.params.lib)
   var fxn = lib[req.params.method]
   if (typeof fxn !== "function") {
     res.send('Function not implemented on the server')
   }
   
   fxn.apply(null, [req, res, handler])

});

router.post('/auth/:lib/:method', handler.authenticated, function(req, res, next) {
  
  //! - - - - - - - - - -- - - - - - -DYNAMICALLY CALL FUNCTIONS
  const auth = require("../auth/"+req.params.lib)
  var fxn = auth[req.params.method]
  if (typeof fxn !== "function") {
    res.send('Function not implemented on the server')
  }
  
  fxn.apply(null, [req, res, handler])

});

router.get('/', function (req, res, next) {

  res.send("API endpoint")
 
})

module.exports = router;
