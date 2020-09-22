const mysql = require('mysql');

const connection ={
    createConn(){
    //      Create connection
        var db = mysql.createConnection({
            host: "db",
            user: "root",
            password: "password",
            database : 'url-db'
        });

    //      Connect do db
    db.connect((err)=> {
        if(err) console.log(err)
        console.log("MySQL connected.");
    });
    return db;
    }
}

module.exports = connection;