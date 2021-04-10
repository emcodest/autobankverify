let model = require('../models/index')
require('dotenv').config()
module.exports = {
    //! - - - - - - - - - -- - - - - - -START LIBRARY
    //================================================ LIBRARY
    bindRawQuery: (query, bind) => {
        // query: select * from users where status = $status, bind = {status: 'active'}
        return new Promise((resolve, reject) => {

            model.sequelize.query(query, {
                bind: bind
            }).spread((results, metadata) => {


                resolve(results)
            })

        })

    },
    genInsert: function (data, table_name) {
        return new Promise((resolve, reject) => {

            model[table_name].create(data).then(function (newData, created) {

                if (!newData) {

                    resolve(null)

                }

                if (newData) {

                    resolve(newData)

                }

            })
        })



    },
    genUpdate: function (data, table_name, cols) {

        return new Promise((resolve, reject) => {
            model[table_name].update(data, {
                    where: cols
                })
                .then(res => {

                    if (res) {

                        resolve(res)
                    }
                }).catch(err => {
                    reject(err)
                })

        })

    },

    genDelete: function (table_name, cols) {

        return new Promise((resolve, reject) => {

            model[table_name].destroy({
                    where: cols
                })
                .then(res => {

                    if (res) {

                        resolve(res)
                    } else {
                        reject("Unable to delete record")
                    }
                }).catch(err => {
                    reject(err)
                })

        })

    },
    Error: (res, m, data = null) => {

        res.json({
            error: true,
            message: m,
            data: data
        })


    },
    Success: (res, m, data = null) => {

        res.json({
            success: true,
            message: m,
            data: data
        })
    },
    Info: (res, m, data = null) => {

        res.json({
            info: true,
            message: m,
            data: data
        })
    },
    isAnEmail: (email) => {

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());

    },
    runCron: function () {
        console.log("Cron started")
        const rcron = "*/3 * * * *" //'* * * * * *'
        var CronJob = require('cron').CronJob
        new CronJob(rcron, function () {


            //
            //! - - - - - - - - - -- - - - - - -CRON TASKS
             module.exports.VerifyNuban()

            //! - - - - - - - - - -- - - - - - -END


        }, null, true, 'Africa/Lagos')
    },
    luxon: () => {
        const {
            DateTime
        } = require("luxon");
        //https://moment.github.io/luxon/docs/manual/install.html
        //https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
        var myDate = DateTime.local();
        return myDate
    },
    formatNumber: (num) => {
        var numeral = require('numeral');
        return numeral(num).format('0,0');

    },
    formatBTC: (num) => {
        var numeral = require('numeral');
        return numeral(num).format('0,0.00000000');

    },
    dateTime: () => {
        var lux = module.exports.luxon()

        return lux.toFormat('yyyy-MM-dd HH:mm:ss')


    },
    myDateFormat: (hour) => {

        var lux = module.exports.luxon()

        var obj = lux.plus({
            hours: hour
        }) // add hour
        //return obj.toFormat('ff')
        return obj.toFormat('t') + ", " + obj.toFormat('DD') // 3:50 PM, Mar 18, 2019
    },
    addTime: (hour) => {
        var lux = module.exports.luxon()
        var obj = lux.plus({
            hours: hour
        }) // add hour
        return obj.toFormat('yyyy-MM-dd HH:mm:ss')
    },
    fileExists: function (path) {
        var fs = require("fs")
        if (fs.existsSync(path)) {
            return true
        } else {
            return false
        }

    },
    deleteFile: async (path) => {
        return new Promise((resolve, reject) => {
            var is_exist = module.exports.fileExists(path)
            var fs = require('fs');
            if (is_exist) {
                // delete file named 'sample.txt'
                fs.unlink(path, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    resolve(true)
                });
            } else {
                resolve(false)
            }


        })

    },
    copy: async function (old_path, new_path) {

        return new Promise(async (resolve, reject) => {
            var fs = require("fs")
            if (fs.existsSync(old_path)) {
                await fs.createReadStream(old_path).pipe(fs.createWriteStream(new_path))
                resolve(true)
            }

        })


    },
    createFile2: function (file_name, content) {
        return new Promise((resolve, reject) => {

            var fs = require("fs")
            fs.writeFile(file_name, content, function (err) {
                if (err) throw err
                resolve(true)
            })
        })


    },
    createFile: function (file_name, content) {
        var fs = require("fs")
        fs.writeFile(file_name, content, function (err) {
            if (err) throw err
            return true
        })

    },
    WriteLine: async function (file_name, content) {
        return new Promise((resolve, reject) => {
            var fs = require('fs')

            fs.appendFile(file_name, content, function (err) {
                if (err) {
                    // append failed
                } else {
                    // done

                    resolve(true)
                }
            })
        })


    },
    readFile: function (file_path) {

        return new Promise((resolve, reject) => {



            const fs = require('fs');

            fs.readFile(file_path, function read(err, data) {
                if (err) {
                    throw err;
                }
                resolve(data)
            })
        })
    },
    LineReader: async (file) => {

        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(file)
        });

        lineReader.on('line', function (line) {
            console.log('Line from file:', line);
        });
    },
    MakeDirectory: (path) => {
        var fs = require('fs');
        var dir = path //'./tmp';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return true
    },
    IsDirectoryExist: (path) => {
        const fs = require("fs"); // Or `import fs from "fs";` with ESM
        if (fs.existsSync(path)) {
            // Do something
            return true
        } else {
            return false
        }
    },
    FileSize: (filename) => {
        const fs = require("fs")
        const stats = fs.statSync(filename)
        const fileSizeInBytes = stats.size
        return fileSizeInBytes

    },
    Login: () => {

        var models = require('../models/index')

        var passport = require("passport")

        //! - - - - - - - - - -- - - - - - -CONFIGURE PASSPORT
        var LocalStrategy = require('passport-local').Strategy

        // used to serialize the user for the session
        passport.serializeUser(function (user, done) {
            //console.log("^$^^$^$^$^$^", user.dataValues)
            //done(null, user.id)
            // user = user.dataValues

            done(null, user.id)
        })
        // used to deserialize the user
        passport.deserializeUser(function (id, done) {

            models.users.findOne({
                where: {
                    id: id,
                    status: "active"
                }
            }).then(function (user) {

                if (user) {
                    // console.log("###>>>>#######>>>>>>", user.dataValues)
                    //  user = user.dataValues
                    done(null, user)
                } else {
                    done(null, false)
                }

            })

        })

        //! - - - - - - - - - -- - - - - - -END CONFIGURE
        // INDICATE STRATEGY 
        passport.use('local-signin', new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, username, password, done) {

                models.users.findOne({
                    where: {
                        username: username,
                        password: password
                    }
                }).then(function (user) {
                    if (user) {

                        // console.log("####", user)
                        //user = user.dataValues
                        done(null, user)



                    } else {

                        //req.flash("error","Invalid Email or Password")
                        //console.log("error")
                        done(null, false)

                    }

                })

            }))

    },
    authenticated: function (req, res, next) {


        if (req.isAuthenticated()) {
            return next()
        }


        res.redirect('/') // login page


    },
    MakeGET: async (request, callback_url, form, ctype = 'application/x-www-form-urlencoded') => {
        console.log("##############", ctype)
        return new Promise(async (resolve, reject) => {

            var options = {
                method: 'GET',
                url: callback_url,
                headers: {
                    'cache-control': 'no-cache',
                    'Content-Type': ctype
                },
                form: form
            };

            request(options, function (error, response, body) {
                if (error)
                    reject(error)
                // throw new Error(error);

                resolve(body);
            });



        })


    },
    MakePost: (request, callback_url, form) => {

        return new Promise((resolve, reject) => {

            var options = {
                method: 'POST',
                url: callback_url,
                headers: {
                    'cache-control': 'no-cache',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                form: form
            };

            request(options, function (error, response, body) {
                if (error)
                    reject(error)
                // throw new Error(error);

                resolve(body);
            });



        })


    },
    Rand: (min, max) => {

        return Math.floor((Math.random() * max) + min);
    },
    RandomChar: (len = 3) => {
        var frand = ""
        var indexs = []
        var len = len;
        var chars = "abcdefghijklnopqrstuvwxyzABCDEFGH_12345678"
        var sp = chars.split("")
        for (var i = 0; i < len; i++) {
            var myrand = module.exports.Rand(0, chars.length)
            indexs.push(myrand)
        }
        for (s of indexs) {

            frand += sp[s]
        }
        return frand;
    },
    GetURL: (url, params) => {

        var mm = Object.keys(params)
        var fparams = []
        for (let o of mm) {
            fparams.push(o + "=" + params[o])
        }
        var murl = url + "?" + encodeURI(fparams.join("&"))
        return murl
    },
    SendMail: async (to, subject, message) => {
        const mailer = require('./SMTP');
        const nodemailer = require('nodemailer');
        let from_user = {... mailer}


        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: mailer.host,
            port: 587, //465 (secure) or 587(unsecure)
            // secure: false, // true for 465, false for other ports
            auth: {
                user: mailer.username,
                pass: mailer.password
            },

            secure: false,
            // here it goes
            tls: {
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"${from_user.name} " <${from_user.email}>`, // sender address
            to: `${to}`, // list of receivers
            subject: `🔥 ${subject}`, // Subject line
            text: `${message}`, // plain text body
            html: `${message}`, // html body,
            headers: {
                'priority': 'high'
            }
        });
        return info
    },
    Auth: async (req, res, secret, jwt) => {

        return new Promise((resolve, reject) => {

            jwt.verify(req.token, secret, (error, authData) => {

                if (error) {

                    //res.sendStatus(403)

                    resolve(module.exports.Error(res, `Authorization failed. Please login`))

                } else {

                    resolve(module.exports.Success(res, `Access granted`, authData))


                }

            })

        })

    },
    Base64Encode: (string) => {
        var {
            base64encode
        } = require('nodejs-base64');

        return base64encode(string)

    },
    Base64Decode: (base64) => {
        var {

            base64decode
        } = require('nodejs-base64')

        return base64decode(base64)
    },
    ReplaceAll: (str, search, replace) => {

        var mm = str.split(search)
        return mm.join(replace)
    },
    HTM2Text: (htmlx) => {
        if (htmlx) {
            var htt = require('cheerio-html-to-text')
            var text = htt.convert(htmlx)

            return text
        } else {
            return htmlx
        }

    },
    HTML2PDF: async (path_pdf_output, html_path) => {
        //https://www.npmjs.com/package/html-pdf
        return new Promise((resolve, reject) => {

            if (html_path) {

                var fs = require('fs');
                var pdf = require('html-pdf')
                var html = fs.readFileSync(html_path, 'utf8')
                var options = {
                    format: 'Letter'
                };

                pdf.create(html, options).toFile(path_pdf_output, function (err, res) {
                    if (err) return console.log(err);
                    resolve(res); // { filename: '/app/businesscard.pdf' }
                })

            } else {
                resolve(false)
            }


        })


    },
    HTML2DOC: async (html, file_name) => {

        return new Promise((resolve, reject) => {

            if (html) {
                html = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title></title>
                </head>
                <body>${html}</body></html>`

                var htmlDocx = require('html-docx-js')
                var docx = htmlDocx.asBlob(html);
                //res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                //res.setHeader('Content-Disposition', `attachment; filename=${ file_name }.docx`);
                //res.setHeader('Content-Length', docx.length);
                // res.send(docx);
                //saveAs(docx, file_name);
                module.exports.createFile(file_name, docx)
                resolve(true)


            } else {
                resolve(false)
            }


        })


    },
    iError: (m, data = null) => {

        return {
            error: true,
            message: m,
            data: data
        }


    },
    iSuccess: (m, data = null) => {

        return {
            success: true,
            message: m,
            data: data
        }


    },
    SetupGoogleAuthenticator: async (user_id) => {
        return new Promise( async (resolve, reject) => {
            const speakeasy = require("speakeasy")
            const qrcode = require("qrcode")
           
            if (!user_id) {
                return resolve(module.exports.iError(`Empty User ID`))
            }
            const auth_secret = speakeasy.generateSecret({
                name: "AutoBankVerify2fa-" + user_id
            })
            console.log('====SECRET ======', auth_secret)
            await module.exports.genUpdate({
                secret: auth_secret.ascii
            }, "users", {
                id: user_id
            })
            qrcode.toDataURL(auth_secret.otpauth_url, async function (err, data) {

            if (err) {

                return resolve(module.exports.iError(`Unable to setup auth`))
            }
            await module.exports.genUpdate({
                qr_code: data
            }, "users", {
                id: user_id
            })
            return resolve(module.exports.iSuccess(`Scan the QrCode with Google Authenticator`, {img: `<img width = "100" src = "${data}" />`}))

            })

            })

    },
    GetTxID: async (table, prefix="A") => {
        let frand = module.exports.Rand(1000, 10000)
        let get_table = await module.exports.bindRawQuery(`select id from ${table} order by id desc limit 1`)
        if(get_table.length < 1){
            return prefix+frand+"0"
        }else{
            let mid = parseInt(get_table[0].id) + 1
            return prefix+frand+""+mid
        }

    },
    ExportToExcel: async (file_path, sheet_name, data, headings) => {
        const xl = require('excel4node');
        const wb = new xl.Workbook();
        const ws = wb.addWorksheet(sheet_name);

        // const data = [{
        //     "name": "Shadab Shaikh",
        //     "email": "shadab@gmail.com",
        //     "mobile": "1234567890"
        // }]

        // const headingColumnNames = [
        //     "Name",
        //     "Email",
        //     "Mobile",
        // ]
        const headingColumnNames  = headings

        //Write Column Title in Excel file
        let headingColumnIndex = 1;
        headingColumnNames.forEach(heading => {
            ws.cell(1, headingColumnIndex++)
                .string(heading)
        });

        //Write Data in Excel file
        let rowIndex = 2;
        data.forEach(record => {
            let columnIndex = 1;
            Object.keys(record).forEach(columnName => {
                ws.cell(rowIndex, columnIndex++)
                    .string(record[columnName])
            });
            rowIndex++;
        });
        wb.write(file_path);
        return true
    },
    VerifyNuban: async () => {
        var request = require("request")
        let logic = require("./AppLogic")
        let accounts = logic.GetAccounts2()
        let lim = process.env.LIMIT_PER_ACCOUNT
        //--------------------------------------------
        for(let oo of accounts){

            let api_key = oo.api_key
            //----------------------------------
            let username = oo.username
            let user_id = await module.exports.bindRawQuery("select id from users where username = $uu", {uu: username})
            user_id = user_id[0].id
           
            console.log('====WORKING ON USER ======', user_id)
            //----------------------------------
            //: verify the cache_account here
            let cache_accounts = await module.exports.bindRawQuery(`select id, retries, account_number, bank_name from cache_accounts where (user_id = $uid and status = 'UNVERIFIED' and retries < 3) order by id desc limit ${lim}`, {uid: user_id})
            //----------------------------------
            for(let pp of cache_accounts){
  
                let retries = pp.retries
                let acc_no = pp.account_number
                let bank_code = await module.exports.GetBankCodeFromNuban(pp.bank_name)
                console.log('===BANK CODES=======', bank_code)
                //---------------------
                if(! bank_code){
                    continue
                }
                //------------------------------------
                setTimeout(async () => {
                    
             
                
                let base_url = `${process.env.NUBAN_HOSTED}/api/${api_key}?acc_no=${acc_no}&bank_code=${bank_code}`
                let get_res = ""
                let get_ver_cache = await module.exports.VerifyNubanFromCache(pp.bank_name, pp.account_number)
                if(! get_ver_cache){
                    
                    get_res = await module.exports.MakeGET(request, base_url, {})
                }else{
                    get_res = get_ver_cache
                }

                 
                get_res = JSON.parse(get_res)

                if("error" in get_res){
                    await module.exports.genUpdate({
                        retries: parseInt(pp.retries, 10) + 1,
                        is_sent: "YES",
                        sent_response: JSON.stringify(get_res)
                    }, "cache_accounts", {id: pp.id})
                  //  continue
                }
                //: 
                if(Array.isArray(get_res)){
                    let account_name = get_res[0].account_name
                    await module.exports.genUpdate({
                        retries: parseInt(pp.retries, 10) + 1,
                        account_name,
                        status: "VERIFIED",
                        is_sent: "YES",
                        sent_response: JSON.stringify(get_res)
                    }, "cache_accounts", {id: pp.id})
                }
             //   console.log('=====INPUT ACCOUNTS=====', acc_no, bank_code)
                console.log('===NUBAN RESPONSE=======', get_res)

            }, process.env.DELAY_TO_NUBAN_MS);

            }
            //-----------------------------------
           


        }
       //----------------------------------------------
      
    },
    GetBankCodeFromNuban: async (bank_name) => {

        //: first check locally
        let get_local_code = await module.exports.bindRawQuery("select bank_code from bank_codes where bank_name = $bb", {bb: bank_name})
        if(get_local_code.length > 0){
            console.log('=====GOT CODE LOCALLY=====', get_local_code[0].bank_code)
            return get_local_code[0].bank_code
        }
        var request = require("request") 

        let base_url = `${process.env.NUBAN_HOSTED}/bank_codes.json`
        let get_res = await module.exports.MakeGET(request, base_url, {}, "application/json")
        get_res = JSON.parse(get_res)
       // console.log('==base_url========', base_url)
        //console.log('==get_res========', get_res[2])
        for(let oo of get_res[2].data){
            if(oo.name == bank_name){
                //: store locally
                await module.exports.genInsert({
                    bank_name: oo.name, bank_code: oo.code
                }, "bank_codes")
                return oo.code
            }
        }
        return false

    },
    VerifyNubanFromCache: async (bank_name, account_number) => {
        let from_cache = await module.exports.bindRawQuery("select sent_response from cache_accounts where (status = 'VERIFIED' and bank_name = $bb and account_number = $cc)", {bb: bank_name, cc: account_number})
        if(from_cache.length > 0){
            console.log('==VERIFIED FROM CACHE========', from_cache[0].sent_response)
            return from_cache[0].sent_response
        }
        return false
    },
    GetNameOfUser: async (username) => {
        let get_name = await module.exports.bindRawQuery("select * from users where username = $uu", {uu: username})
        return get_name.length > 0 ? get_name[0] : false
    }
}