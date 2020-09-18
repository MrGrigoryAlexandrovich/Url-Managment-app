const connection = require('../connection/connection')
const sql = require('../queries/sql')

class Queries{

    async Delete(id){
        const db= await connection.createConn();
        db.query(sql.delete,id,(err,result) => {
            if (err) throw err;
            console.log(result)
        })
        db.end((err) => console.log("Connection closed"));        
    }
    async Create(realURL,shortURL){
        const db= await connection.createConn();
        db.query(sql.create,[realURL,shortURL],(err,result) => {
            if (err) throw err;
            console.log({id : result.insertId,realURL,shortURL})
        })
        db.end((err) => console.log("Connection closed"));        
    }
}

module.exports = Queries;
