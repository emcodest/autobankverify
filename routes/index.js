let express = require('express');
let router = express.Router();
let handler = require("../lib/Handler")
let logic = require("../lib/AppLogic")
let hl = handler
let request = require("request")
require('dotenv').config();
//---------------------------------------------------
let app_name = "AutoBank Verifier"
let app_short_name = "AutoBank Verifier"
let app_logo = "/images/logo.png"

//--------------------------------------------------
let myLogger = async function (req, res, next) {

  console.log("########## SIMPLE EXPRESS MIDDLEWARE ################")
  //console.log(layout)

  next()
}
router.use(myLogger)

//_______________________HANDLE FILE UPLOADS FOR AUTH only___________

  
const multer = require('multer');
const upload = multer();


router.post('/upload-sheet', upload.any(), async function (req, res) {
  
//------------------------------------- UPLOAD SHEET


// console.log("#####################", Object.keys(req.files).length)
if (Object.keys(req.files).length == 0) {

  return handler.Bad(res, 'No files were uploaded.', () => {  }, {})
}
if(! req.user){
  return hl.Error(res, `Please login to continue`)
}
//-------------------------------------
    var fs = require('fs');
    var path = require('path');
   
    var ext = req.files[0].originalname.split(".").pop()
 
    if (ext != "xlsx") {
      hl.Error(res, "Invalid file extension")
      return
    }
    if(! req.body.batch_name){
      hl.Error(res, "Batch name is required")
      return
    }
    
    

    var user_id = req.user.id
    //: check if batch name exist for the user
    let is_batch = await hl.bindRawQuery("select id from batch_list where user_id = $uid and batch_name = $name", {uid: user_id, name: req.body.batch_name})
    if(is_batch.length > 0){
      hl.Error(res, "Batch name already exist")
      return
    }
    var mpath = path.join(__dirname, "..", "public", "sheets", "_u"+user_id+"uploads."+ext)
    
   // var mpath_output = path.join(__dirname, "..", "public", ext_out, one_file_a)


      fs.writeFile(mpath, req.files[0].buffer, async (err) => {
        if (err) {
          console.log('Error: ', err);
          res.status(500).send('An error occurred: ' + err.message);
        } else {
          //: file was uploaded
          //: use node excel to read the values and store in database
          // File path.
        const readXlsxFile = require('read-excel-file/node');
        let ii = 0
        readXlsxFile(mpath).then(async (rows) => {
          //: runs once - create batch and get the ID
          let get_batch = await hl.genInsert({
            user_id, batch_name: req.body.batch_name
          }, "batch_list")
          let batch_id = get_batch.id
          for(let oo of rows){

            ii++
            if(ii == 1)
            continue
            //console.log('====II======', ii)
            // `rows` is an array of rows
            // each row being an array of cells.
            if(oo){
              if(oo[0]){
                //: if bank name is set
                hl.genInsert({
                 user_id, batch_id, account_number: oo[1], status: "UNVERIFIED", is_sent: "NO",
                  bank_name: oo[0], retries:0
                }, "cache_accounts").then(_x => {
                  console.log('=====UPDATED IN DB=====')
                })
              // console.log('===ROWS=======', oo)
              // console.log('===Batch Name=======', req.body.batch_name)
              // console.log('===Bank Name=======', oo[0])
              // console.log('===Account No=======', oo[1])

              }
            }
          }

          //: INITIATE PROCESSING, THIS TIMES OUT IF SERVER IS RESTARTED
          //: records = 1000, seconds = 300 - run the batch every 5 minutes
          //: record = 2, seconds = 0.6 - process 2 records every 300ms

          /* ----------------------------- start the robot ---------------------------- */
         // let config =  hl.RobotSettings()
         // hl.VerifyNuban2(config.record, batch_id, config.time)
         /* ----------------------------- end start robot ---------------------------- */
        
        })
          return hl.Success(res, `Upload successful`)

          //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

         

        }
      });
       
    
   
   

})


//---------------------LOGIN--------------------------------
router.get('/', async function (req, res) {

  
  if("user" in req){
    if(req.user.id){
      await hl.genUpdate({
        is_2fa: null
      }, "users", {id: req.user.id})
    }
  }
  req.logout()

  res.render('login', {
    title: app_name,
    app_name,
    app_logo,
    app_short_name
  });


});
router.get('/outbound', async function (req, res) {
  var request = require("request")
  let nuban = await handler.MakePost(request, "https://jsonplaceholder.typicode.com/todos/1", {})
  res.json(nuban)
});
router.get('/check-nuban', async function (req, res) {
  var request = require("request")
  let nuban = await handler.MakeGET(request, "https://app.nuban.com.ng/bank_codes.json", {})
  res.json(nuban)
});

//------------------------------DASHBOARD-------------------------------

router.get('/user/:view', handler.authenticated, async function (req, res, next) {
//router.get('/user/:view',  async function (req, res, next) {
 
  let view = req.params.view

  let uid = req.user.id
  let user_id = uid
  let mtype = "user"
  let mrequser = req.user
  
  //: check if view exist
  let view_path = require("path")
  view_path = view_path.join(__dirname, "..", "views", mtype, view+".ejs")
  let is_view = hl.fileExists(view_path)
  if(! is_view){
    view = "404"
  }
  
  let odata = {
    user_id: uid,
    view: view,
    user_type: req.user.user_type,
    user: mrequser,
    title: app_name,
    app_name,
    app_logo,
    app_short_name
  } 
    
  //         if admin
  //--------------------------------
  if(req.user.username == "admin"){
//    odata.accounts = logic.GetAccounts2()
    odata.accounts = await handler.bindRawQuery("select * from users order by id asc limit 100")
    
    return  res.render("admin", odata)
  }
  //---------------------------------
     
     
      //: SWITCH VIEWS
      switch (view) {
        case "home":
          let from_tz_1 = await hl.GetSessionTimeZone()
          let to_tz_1 = '+01:00'
          const home_batches = await hl.bindRawQuery(`select date_format(convert_tz(created_at, '${from_tz_1}', '${to_tz_1}'), '%d %M, %Y %H:%i:%s') as created_at, id, batch_name, (select count(1) from cache_accounts where batch_id = x.id) as cnt from batch_list x where user_id = $uid order by id desc limit 10`, {uid: user_id})
          odata.batches = home_batches
          //: total verified accounts of the user
          let verified = await hl.bindRawQuery("select count(1) as cnt from cache_accounts where user_id= $uid and status = 'VERIFIED'", {uid: user_id})
          let unverified = await hl.bindRawQuery("select count(1) as cnt from cache_accounts where user_id= $uid and status <> 'VERIFIED'", {uid: user_id})
          odata.verified = verified[0].cnt
          odata.unverified = unverified[0].cnt
          //: and total unverified accounts
          break;
        case "uploaded-batches":
         
       
    
          let from_tz = await hl.GetSessionTimeZone()
          let to_tz = '+01:00'
          const all_batches = await hl.bindRawQuery(`select date_format(convert_tz(created_at, '${from_tz}', '${to_tz}'), '%d %M, %Y %H:%i:%s') as created_at, id, batch_name, (select count(1) from cache_accounts where batch_id = x.id) as cnt from batch_list x where user_id = $uid order by id desc limit 1000`, {uid: user_id})
          odata.batches = all_batches
          break;
        case "report":
          const skip_id = req.query["_skipid"]  || false
          if(! skip_id){
        
          const batch_id = req.query["_id"] || -1
          const report = await hl.bindRawQuery("select date_format(updated_at, '%d %M, %Y %H:%i:%s') as updated_at, id, batch_id, account_number, bank_name, account_name, status from cache_accounts where batch_id = $uid limit 500", {uid: batch_id})
          odata.report = report
          odata.batch_name = await hl.bindRawQuery("select batch_name from batch_list where id = $idd", {idd: batch_id})
          odata.batch_name = odata.batch_name[0].batch_name
          odata.report_type = "batch"
          odata.report_id = batch_id

          }else{
            const get_verify =  req.query["_verified"] || false
       
            const report = await hl.bindRawQuery("select date_format(updated_at, '%d %M, %Y %H:%i:%s') as updated_at, id, batch_id, account_number, bank_name, account_name, status from cache_accounts where status = $uid and user_id = $idd limit 500", {uid: get_verify, idd: user_id})
            odata.report = report
            
            odata.batch_name = "n/a"
            odata.report_type = "_verified"
            odata.report_id = get_verify

          }
          break;
      
        default:
          break;
      }
      res.render("user/layout", odata)
});

router.get('/worker.js',  async function (req, res, next) {

  //: verify bank accounts inside a light weight thread
   if(req.query.batch_id && req.query.no_records){
      hl.StartProcessing(+req.query.no_records, +req.query.batch_id).then(_res => console.log(_res))
      res.send("OK")
   }else{
    res.send("Please enter batch_id and no_records")
   }
   

})

//-----------------------------------------------------------------

module.exports = router;