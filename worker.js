(async function () {
    const hl = require("./lib/Handler")

    const { isMainThread, parentPort, Worker, workerData } = require("worker_threads")


    if (isMainThread) {

    } else {
        //: heavy code computation code HERER 
        // console.log('\x1b[41m%s\x1b[0m', "workerData")
        // console.log('#######', workerData)
        const { no_records, batch_id } = workerData
        //: keep doing this every 20 seconds until done
        let counter = 0

        let int = setInterval(async () => {
            let get = await hl.bindRawQuery("select id, status from batch_workers where batch_id = $uid", {
                uid: batch_id
            })
            if(get.length > 0){
                if(get[0].status != "active"){
                    clearInterval(int)
                    parentPort.postMessage(false) // exit
                }
            }
            counter++
            console.log("Doing this", counter)
            const pro = await hl.VerifyNuban2(no_records, batch_id)
            //return pro
          
            //: no batch to verify again
            if (pro === false) {
                
                clearInterval(int)
               
              
            }

            parentPort.postMessage(pro)


        }, 20000)

    }

})()