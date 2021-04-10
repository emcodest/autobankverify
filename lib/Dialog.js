const hl = require("./Handler")
this.ViewUser = async (req, res) => {
        let user_id = req.body.user_id
        let get_name = await hl.GetNameOfUser(user_id)
     
        let rst = {
            title: "View User: "
        }
        rst.body = `
        <div class = 'form-group'>
            <label>Full Name</label>
            <input disabled value = "${get_name.fname || ""}" type = "text" placeholder = "Full Name" class = "form-control fname" />
        </div>
        <div class = 'form-group'>
            <label>Username</label>
            <input disabled value = "${get_name.username}" type = "text" placeholder = "Username" class = "form-control user_name" />
        </div>
       
       
        
        `

        res.json(rst)

}
this.EditUser = async (req, res) => {
        let user_id = req.body.user_id
        let get_name = await hl.GetNameOfUser(user_id)
     
        let rst = {
            title: "Edit User: "
        }
        rst.body = `
        <div class = 'form-group'>
            <label>Full Name</label>
            <input value = "${get_name.fname || ""}" type = "text" placeholder = "Full Name" class = "form-control fname" />
        </div>
        <div class = 'form-group'>
            <label>Username</label>
            <input value = "${get_name.username}" type = "text" placeholder = "Username" class = "form-control user_name" />
        </div>
        <div class = 'form-group'>
            <label>Password</label>
            <input type = "text" placeholder = "Password" class = "form-control password" />
        </div>
        <div class = 'form-group'>
            <label>Confirm Password</label>
            <input type = "text" placeholder = "Confirm Password" class = "form-control confirm_password" />
        </div>
        <br>
        <button req = "fname,user_name,password,confirm_password" params = "${get_name.id}" func = "SaveUser" class = "click btn btn-success">Save Changes</button>
        
        `

        res.json(rst)

}
this.SaveUser = async (req, res) => {

    const {user_id, fname, user_name, password, confirm_password} = req.body
    var username =  user_name
    let mdata = {}
    if(! user_id){
        return hl.Error(res, `Userid is required`)
    }
    if(! user_name){
        return hl.Error(res, `Username is required`)
    }
    if(password || confirm_password){
        if(password != confirm_password){
            return hl.Error(res, `Password do not match`)
        }
        mdata.password = password
    }
    if(fname){
        mdata.fname = fname
    }
    //: get old username
    let get_old = await hl.bindRawQuery("select id, username from users where id = $idd", {
        idd: user_id
    })
    if(get_old.length < 1){
        return hl.Error(res, `Account does not exist`)
    }
    if(get_old[0].username != username){
        //: check if username already exist
        let get_exist = await hl.bindRawQuery("select id, username from users where username = $idd", {
            idd: username
        })
        if(get_exist.length > 0){
            return hl.Error(res, `Username already exist for another account!`)
        }
        mdata.username = username
    }

    //: user id is required
    await hl.genUpdate(mdata, "users", {id: user_id})
    return hl.Success(res, `Changes saved successfully`)
}