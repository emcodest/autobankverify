const hl = require("../lib/Handler")
const speakeasy = require("speakeasy")

this.VerifyGoogleAuthenticator = async (req, res) => {
    let {code} = req.body
    if(! code){
        return  hl.Error(res, `Empty code`)
    }
    const user_id = req.user.id
    const secret = await hl.bindRawQuery("select secret from users where id = $idd", {idd: user_id})
    console.log('==========',code, user_id, secret)
    if(secret.length < 1){
        
        return  hl.Error(res, `Invalid secret code`)
    }
    if(! secret[0].secret){
        return  hl.Error(res, `Secret code not setup`)
    }
    const verified = speakeasy.totp.verify({
        secret: secret[0].secret.toString().trim(),
        encoding: "ascii",
        token: code.toString().trim()
    })
    console.log('=====verified=====', verified)
    if(! verified){
        return  hl.Error(res, `Invalid login code`)
    }
    if(verified === true){
        await hl.genUpdate({
            is_2fa: "yes"
        }, "users", {id: user_id})
        return hl.Success(res, `Login Successful`)
    }else{
        return  hl.Error(res, `Invalid login code`)
    }

}