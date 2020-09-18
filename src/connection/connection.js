const mysql = require('mysql');

const connection ={
    createConn(){
    //      Create connection
        var db = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database : 'url-db'
        });

    //      Connect do db
    db.connect((err)=> {
        if(err) throw err;
        console.log("MySQL connected.");
    });
    return db;
    }
}

module.exports = connection;