
(async function(){
    const hl = require("./lib/Handler")
   // let rest = await hl.bindRawQuery("SELECT @@session.time_zone")
    //console.log('==========', rest)
    const limit = 2
    //const seconds = 3
    let dd = await hl.RunJob(limit)
    console.log('\x1b[41m%s\x1b[0m', "RUNNING JOB")
    console.log('###JOB RESULT####', dd)
})()