const hl = require("./Handler")
const accounts = [
    {
     username: "user-001", password: "123876", 
     api_key: "NUBAN-ASXPQYZZ435"

   },
    {
     username: "user-002", password: "123176",
     api_key: "NUBAN-UDHPSGCU439"
   },
    {
     username: "user-003", password: "123276",
     api_key: "NUBAN-ESRDYNIB440"
   },
    {
     username: "user-004", password: "123976",
     api_key: "NUBAN-RKROAVNX441"
   },
    {
     username: "user-005", password: "123676",
     api_key: "NUBAN-TJJQDXXV442"
   },
    {
     username: "user-006", password: "123076",
     api_key: "NUBAN-GSIHHRHV443"
   },
    {
     username: "user-007", password: "123976",
     api_key: "NUBAN-VVEKXZTS444"
   },
    {
     username: "user-008", password: "123176",
     api_key: "NUBAN-HRFUERRO445"
   },
    {
     username: "user-009", password: "123926",
     api_key: "NUBAN-JOYKKXPD446"
   },
    {
     username: "user-0010", password: "123576",
     api_key: "NUBAN-UGSGHHCI447"
   },
    {
     username: "admin", password: "admin234"
   }
]
this.CreateDefaultAccounts = async () => {
       
       setTimeout(async () => {
        await hl.bindRawQuery("truncate users")
        //! CREATE 10 ACCOUNTS AND WRITE THE OUTPUT
        const my_accounts = this.GetAccounts()
        for(const oo of my_accounts){
         
               await hl.genInsert(oo, "users")
               console.log('===CREATING USERS=======', oo)
              
           
        }
      }, 10000);
       
      

}
this.GetAccounts = () => {
    
    return accounts;
}
this.GetAccounts2 = () => {
   let acc = []
    for(let oo of accounts){

      if(oo.username == "admin"){
        continue
      }
      acc.push(oo)
    }

    return acc;
}