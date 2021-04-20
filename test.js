
(async function(){
    const hl = require("./lib/Handler")
    let rest = await hl.bindRawQuery("SELECT @@session.time_zone")
    console.log('==========', rest)
})()