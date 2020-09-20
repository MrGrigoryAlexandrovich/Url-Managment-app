const connection = require('../connection/connection')
const sql = require('../queries/sql')
const producer = require('../producer');

class Queries{

    async Delete(id){
        const db= await connection.createConn();
        db.query(sql.delete,id,(err,result) => {
            if (err) throw err;
            if(result.affectedRows>0) 
            {
            console.log("DELETED")
            producer([
                "Deleted",
                id
            ])
            }
            else
            console.log("NOT FOUND")
        })
        db.end((err) => console.log("Connection closed"));        
    }
    async Create(realURL,shortURL){
        const db= await connection.createConn();
        db.query(sql.create,[realURL,shortURL],(err,result) => {
            if (err) throw err;
            console.log({id : result.insertId,realURL,shortURL})
            console.log(result);
            producer([
                "Created",
                result.insertId,
                realURL,
                shortURL
            ]);
        })
        db.end((err) => console.log("Connection closed"));        
    }
}

module.exports = Queries;
