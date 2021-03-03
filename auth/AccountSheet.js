const hl = require("../lib/Handler")
const path = require("path")
this.ExportReport = async (req, res) => {
    const user_id = req.user.id
    const {report_type, report_id} = req.body
    if(! report_type){
        return hl.Error(res, `Report Type is required`)
    }
    //: report_id = batch_id, VERIFIED, UNVERIFIED
    //: report_type: batch, _veriifed
    if(! report_id){
        return hl.Error(res, `Report ID is required`) // 
    }
     let pub = ""
   //  console.log('==========',report_type, report_id )
    switch (report_type) {
        case "batch":
            const reportx = await hl.bindRawQuery("select bank_name, account_number, account_name, status from cache_accounts where batch_id = $uid and user_id = $idd", {uid: report_id, idd: user_id})
            // const reportx = await hl.bindRawQuery("select bank_name, account_number, account_name, status from cache_accounts where status = $uid and user_id = $idd", {uid: report_id, idd: user_id})
            //: write this(get_report) to excel workbook
            let path_locx =  path.join(__dirname, "..", "public", "sheets", "u_"+user_id+"report.xlsx")
             await hl.ExportToExcel(path_locx, "report-"+user_id, reportx,  ["Bank Name", "Account Number", "Account Name", "Status" ])
            pub = "/sheets/"+"u_"+user_id+"report.xlsx"
            break;
        case "_verified":
            const report = await hl.bindRawQuery("select bank_name, account_number, account_name, status from cache_accounts where status = $uid and user_id = $idd", {uid: report_id, idd: user_id})
            //: write this(get_report) to excel workbook
            let path_loc = path.join(__dirname, "..", "public", "sheets", "u_"+user_id+"report.xlsx")
            await hl.ExportToExcel(path_loc, "report-"+user_id, report, 
            ["Bank Name", "Account Number", "Account Name", "Status" ])
            pub = "/sheets/"+"u_"+user_id+"report.xlsx"
            break;
    
        default:
            break;
    }
    return hl.Success(res, `Export successfully`, pub)
}
this.ExportReport2 = async (req, res) => {
    const user_id = req.user.id
    const {report_type, report_id, report_type2} = req.body
    if(! report_type){
        return hl.Error(res, `Report Type is required`)
    }
    if(! report_type2){
        return hl.Error(res, `Report Type2 is required`)
    }
    
    if(! report_id){
        return hl.Error(res, `Report ID is required`) // 
    }
     let pub = ""
  
            const reportx = await hl.bindRawQuery("select bank_name, account_number, account_name, status from cache_accounts where (batch_id = $uid and user_id = $idd and status = $ss)", {uid: report_id, idd: user_id, ss: report_type2})
           
            let path_locx =  path.join(__dirname, "..", "public", "sheets", "u_"+user_id+"report.xlsx")
             await hl.ExportToExcel(path_locx, "report-"+user_id, reportx,  ["Bank Name", "Account Number", "Account Name", "Status" ])
            pub = "/sheets/"+"u_"+user_id+"report.xlsx"
         
        
    return hl.Success(res, `Export successfully`, pub)
}