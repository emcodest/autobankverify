const hl = require("../lib/Handler")
const path = require("path")
this.TrackUploads = async (req, res) => {
    // const user_id = req.user.id
    const { batch_id } = req.body
    if (!batch_id) {
        return hl.Error(res, `Batch ID is required`)
    }

    const report = await hl.bindRawQuery("select count(1) as cnt from cache_accounts where status = $uid and batch_id = $idd", { uid: "VERIFIED", idd: batch_id })
    const report2 = await hl.bindRawQuery("select count(1) as cnt from cache_accounts where batch_id = $idd", { idd: batch_id })
    const report3 = await hl.bindRawQuery("select count(1) as cnt from cache_accounts where (batch_id = $idd and retries > 2 and status = 'UNVERIFIED')", { idd: batch_id })

    let percentage = 0
    let retries = 0
    if(report2[0].cnt == 0 && report[0].cnt == 0){

        percentage = "0%"

    }else{
        retries = parseInt(report3[0].cnt)
        let per = report[0].cnt + parseInt(retries) 
        per = per / report2[0].cnt
        per = parseInt(per*100)
        percentage = per+"%"

    }

   


    res.json({
        total: report2[0].cnt,
        verified: +report[0].cnt + +retries,
        percentage
    })


}
this.RestartBatch = async (req, res) => {
    // const user_id = req.user.id
    const { batch_id } = req.body
    if (!batch_id) {
        return hl.Error(res, `Batch ID is required`)
    }
    //: process 2 records every 300ms 
    let config =  hl.RobotSettings()
    hl.VerifyNuban2(config.record, batch_id, config.time)

    return hl.Success(res, 'Verification Process Restarted')

}
this.StartBatch = async (req, res) => {
    // const user_id = req.user.id
    const { batch_id } = req.body
    if (!batch_id) {
        return hl.Error(res, `Batch ID is required`)
    }
    const records = hl.NoRecords()
    let get = await hl.bindRawQuery("select id from batch_workers where batch_id = $uid", {
        uid: batch_id
    })
    if(get.length < 1){
        await hl.genInsert({
            batch_id, status: "active"
        }, "batch_workers")
    }else{
        await hl.genUpdate({
         status: "active"
        }, "batch_workers", {id: get[0].id})
    }
    hl.StartProcessing(records, batch_id).then(_res => console.log(_res))
    
    if(req.body.retries){
        await hl.genUpdate({
            retries: 0
        }, "cache_accounts", {batch_id, status: "UNVERIFIED"})
    }

    return hl.Success(res, 'Batch verification started successfully')

}
this.StopBatch = async (req, res) => {
    // const user_id = req.user.id
    const { batch_id } = req.body
    if (!batch_id) {
        return hl.Error(res, `Batch ID is required`)
    }
    const records = hl.NoRecords()
    let get = await hl.bindRawQuery("select id from batch_workers where batch_id = $uid", {
        uid: batch_id
    })
    if(get.length < 1){
        await hl.genInsert({
            batch_id, status: "inactive"
        }, "batch_workers")
    }else{
        await hl.genUpdate({
         status: "inactive"
        }, "batch_workers", {id: get[0].id})
    }
    hl.StartProcessing(records, batch_id).then(_res => console.log(_res))
    

    return hl.Success(res, 'Batch verification stopped successfully')

}