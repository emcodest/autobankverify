
(async function(){
    const hl = require("./lib/Handler")
   // let rest = await hl.bindRawQuery("SELECT @@session.time_zone")
    //console.log('==========', rest)
    const no_records = 2
    const batch_id = 1
    //const seconds = 3
    let dd = await hl.StartProcessing(no_records, batch_id)
    console.log('\x1b[41m%s\x1b[0m', "RUNNING JOB")
    console.log('###JOB RESULT####', dd)
})()