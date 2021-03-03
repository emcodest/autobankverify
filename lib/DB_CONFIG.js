const VAR_ENV = require('dotenv').config();
var mpath = require("path")
var fs = require("fs")
//----- ONLY USED IN PRODUCTION
// var certx = mpath.join(__dirname, "..", "mysql-ssl", "client-cert.pem")
// var cax = mpath.join(__dirname, "..", "mysql-ssl", "emma.pem")
// var keyx = mpath.join(__dirname, "..", "mysql-ssl", "client-key.pem")
//---------- END USED IN PRODUCTION
this.Config = () => {

    return {

        "development": {
    
            "username": process.env.MYSQL_USER,
    
            "password": process.env.MYSQL_PASSWORD,
    
            "database": "autobankverify",
    
            "host": "localhost",
    
            "dialect": "mysql"
    
        },
    
        "test": {
    
            "username": "ffffff",
    
            "password": null,
    
            "database": "",
    
            "host": "",
    
            "dialect": "mysql"
    
        },
    
        "production": { 
    
           
            "username": process.env.MYSQL_USER,
    
            "password": process.env.MYSQL_PASSWORD,
    
            "database": "autobankverify",
    
            "host": "localhost",
    
            "dialect": "mysql"
    
        }
        
    
    }





}