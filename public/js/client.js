
 var methods = {}


 methods.Login = function () {
  
     
     var form = this.mobj
     var url = _app.GetAPI("Account", "LoginUser")
    //  var url2 = _app.GetAuthURL("Vendor", "Test")
    //  alert(url2)
     
     _app.Ajax(url, form, "json", function (res) {
    //   alert(res)
        if(res.success){
            
           
            // $(".show_2fa_img").html(res.data.img)
            // dashboard.$set(dashboard.mobj, 'show_2fa_code', true)
            // dashboard.$set(dashboard.mobj, 'show_2fa_btn', true)
            setTimeout(function() {
            
                window.location.href = "/user/home"
                 
            }, 2000)
          
        }
        

     })


 }
 methods.Register = function (mobj) {
   
    let form = mobj
    form.account_type = $(".account-type").val()

    let url = _app.GetAPI("Account", "RegisterUser")
    
    _app.Ajax(url, form, "json", function (res) {
      
       if(res.success){
           
           setTimeout(function() {
           
               window.location.href = "/"
               
           }, 3000);
       }
       

    })


 }
 methods.ForgotPassword = function () {
    
      var form = {email: $("[name=email]").val()}
      var url = _app.GetAPI("Account", "ForgotPassword")
   
     
     _app.Ajax(url, form, "json", function (res) {
       
        if(res.success){
            
            setTimeout(function() {
            
                window.location.href = "/"
                
           }, 3000);
        }
        

     })


 }
 methods.UpdateMyProfile = function(params, _this, event) {
    

    var first_name = $(".first-name").val()
    var last_name = $(".last-name").val()
    var email = $(".email-address").val()
 
 
 
    var form = { first_name: first_name, last_name: last_name, email: email }
    var url = _app.GetAuthURL("Profile", "UpdateProfile")
 
    _app.Ajax(url, form, "json", function(res) {
 
        if (res.success) {
 
            setTimeout(function() {
 
                 window.location.href = window.location.href.toString()
 
            }, 3000);
        }
 
 
    })
 
 }
 methods.ExportReport = function(params, _this, event) {
 
    let report_type = _this.attr("req")
    let report_id = params
    
 
    var form = {
        report_type: report_type,
        report_id: report_id
    }
    var url = _app.GetAuthURL("AccountSheet", "ExportReport")
 
    _app.Ajax(url, form, "json", function(res) {
 
        if (res.success) {
 
            setTimeout(function() {
 
                 window.location.href = res.data // download the report
 
            }, 4000);
        }
 
 
    })
 
 }
 methods.ExportReport2 = function(params, _this, event) {
 
    let report_type = _this.attr("req")
    let report_type2 = _this.attr("req2")
    let report_id = params
    
 
    var form = {
        report_type: report_type,
        report_id: report_id,
        report_type2: report_type2
    }
    var url = _app.GetAuthURL("AccountSheet", "ExportReport2")
 
    _app.Ajax(url, form, "json", function(res) {
 
        if (res.success) {
 
            setTimeout(function() {
 
                 window.location.href = res.data // download the report
 
            }, 4000);
        }
 
 
    })
 
 }
 methods.ChangePassword = function(params, _this, event) {
 
 
    var current_password = $(".current_password").val()
    var new_password = $(".new_password").val()
    var verify_password = $(".verify_password").val()
 
    var form = {
        current_password: current_password,
        new_password,
        verify_password: verify_password
    }
    var url = _app.GetAuthURL("Profile", "ChangePassword")
 
    _app.Ajax(url, form, "json", function(res) {
 
        if (res.success) {
 
            setTimeout(function() {
 
                // window.location.href = "/user/saved-emails"
 
            }, 4000);
        }
 
 
    })
 
 }

methods.GoTo = function(view){
    window.location.href = view
 }
methods.UploadSheet = function(params, _this, e){
    let batch_name = $(".batch-box").val()
    if(! batch_name){
        return _app.Error("Enter a batch name")
    }
    $("#uploadsheet").trigger("click")
    $("#uploadsheet").change(function(e){
        let formData = new FormData();
        formData.append('file', $(this)[0].files[0]);
        formData.append('batch_name', batch_name);
        //alert('sending')
        $.ajax({
            url : '/upload-sheet',
            type : 'POST',
            data : formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success : function(data) {
                console.log(data);
               // alert(data);
                //let mres = JSON.parse(data)
                if(data.success){
                   _app.Success(data.message)
                   setTimeout(() => {
                       window.location.href = window.location.href.toString()
                   }, 3000);
                }else{
                    _app.Error(data.message)
                }
            }
        });
    })
    
        
   
}
//--------------------------------
methods.ViewUser = function (_p, _this, e) {
  
    
    var form = {user_id: _p}
    var url = _app.GetAPI("Dialog", "ViewUser")
    
    _app.Ajax(url, form, "json", function (res) {
        
       $(".modal-title").html("")
       $(".modal-body").html("")
       //-----------------------
       $(".modal-title").html(res.title)
       $(".modal-body").html(res.body)
       $("#modal-id").modal("show")

    })


}
methods.EditUser = function (_p, _this, e) {
  
    
    var form = {user_id: _p}
    var url = _app.GetAPI("Dialog", "EditUser")
    
    _app.Ajax(url, form, "json", function (res) {
        
       $(".modal-title").html("")
       $(".modal-body").html("")
       //-----------------------
       $(".modal-title").html(res.title)
       $(".modal-body").html(res.body)
       $("#modal-id").modal("show")

    })


}
methods.SaveUser = function (_p, _this, e) {
    var read = {user_id: _p}
    var get_inputs = _this.attr("req")
    var l_inpt = get_inputs.split(",")
    for(let oo of l_inpt){
        var mm = oo.trim()
        read[mm] = $("."+mm).val()
    }
    var form = read
    var url = _app.GetAPI("Dialog", "SaveUser")
    
    _app.Ajax(url, form, "json", function (res) {
        
        if (res.success) {
 
            setTimeout(function() {
 
                window.location.href = window.location.href.toString()
 
            }, 3000);
        }
    })


}
methods.DeleteBatch = function (_p, _this, e) {
    if(confirm("Are you sure ?") == false)
    return
 
    var form = {id: _p}
    var url = _app.GetAPI("Dialog", "DeleteBatch")
    
    _app.Ajax(url, form, "json", function (res) {
        
        if (res.success) {
 
            setTimeout(function() {
 
                window.location.href = window.location.href.toString()
 
            }, 3000);
        }
    })


}
methods.RestartBatch = function (_p, _this, e) {
    if(confirm("Are you sure ?") == false)
    return
  
 
    var form = {batch_id: _p, retries: 0}
   // var url = _app.GetAuthURL("Track", "RestartBatch")
    var url = _app.GetAuthURL("Track", "StartBatch")
    
    _app.Ajax(url, form, "json", function (res) {
        
        if (res.success) {
            setTimeout(() => {
                window.location.href = window.location.href.toString()
                
            }, 3000);
 
        }
    })


}
methods.StartBatch = function (_p, _this, e) {
   
  
 
    var form = {batch_id: _p}
    var url = _app.GetAuthURL("Track", "StartBatch")
    
    _app.Ajax(url, form, "json", function (res) {
        
        if (res.success) {
         
 
        }
    })


}
methods.StopBatch = function (_p, _this, e) {
   
  
 
    var form = {batch_id: _p}
    var url = _app.GetAuthURL("Track", "StopBatch")
    
    _app.Ajax(url, form, "json", function (res) {
        
        if (res.success) {
         
 
        }
    })


}