const handler = require("./Handler")
const  hl = handler

var passport = require("passport")
_this = module.exports
handler.Login()
// this.SetupGoogleAuthenticator = async (req, res, next) => {

   
    
//  }
_this.LoginUser = async (req, res, next) => {

    passport.authenticate('local-signin', function (err, user, info) {
        var {username, password} = req.body
        console.log("##################")
        if (err) {
            handler.Error(res, "Bad Login!")
            return //next(err);
        }
        if(! username){
            handler.Error(res, "Empty username")
            return //next(err);
        }
        if(! password){
            handler.Error(res, "Invalid password")
            return //next(err);
        }
        
        if (! user) {
           return  handler.Error(res, "Invalid username or password")
           
           // return next(err)
        }
        req.logIn(user, async function (err) {

            if (err) {
                handler.Error(res, "Invalid username or password")
                //return res.redirect('/login');

                return //next(err);

            }

            if(user){
             

              handler.Success(res, "Login Successful")
            }
            


        });

    })(req, res, next); 


}
