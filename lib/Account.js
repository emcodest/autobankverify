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
                //!: REQUIRE GOOGLE AUTHENTICATOR BY DEFULT
                //: check if is_2fa
                 let is_2fa = await hl.bindRawQuery("select qr_code from users where id = $idd and is_2fa = 'yes'", {idd: user.id})
              //   console.log('===USER ID=======', user.id)
                if(is_2fa.length === 1){
                  return  handler.Success(res, "Please scan QRCODE to proceed", {img: `<img width = "100" src = "${is_2fa[0].qr_code}" />`} )
                }else{
                    let new_2fa = await handler.SetupGoogleAuthenticator(user.id)
                    if("success" in new_2fa){
                        let get_n_image = new_2fa.data.img
                       return handler.Success(res, "Please scan QRCODE to proceed", {img:  get_n_image})
                    }
                    return handler.Error(res, "Error: "+new_2fa.message)
                }

             //   handler.Success(res, "Login Successful")
            }
            


        });

    })(req, res, next); 


}
