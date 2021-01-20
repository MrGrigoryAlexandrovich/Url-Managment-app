//loadig mysql and config
const mysql = require('mysql')
const config = require('../../config')

module.exports =  connection ={
    createConn(){
        //Create connection
        const db = mysql.createConnection({
            host: config.db_host,
            user: config.db_user,
            password: config.db_password,
            database : config.db_name
        })
    // Connect do db
    db.connect((err)=> {
        if(err) console.log(err)
    })
    return db
    }
}

