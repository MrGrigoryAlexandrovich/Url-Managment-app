const connection = require('../connection/connection')
const sql = require('../queries/sql')
const producer = require('../producer');

class Queries{

    async Delete(id){
        var res;
        const db= await connection.createConn();
        db.query(sql.select,[id],(err,result) => {
            if (err) console.log("Error "+err);
            res = result[0];
        })
        db.query(sql.delete,id,(err,result) => {

            if (err) console.log("Error "+err);
            if(result.affectedRows>0) 
            {
            console.log("DELETED")
            producer([
                "Deleted",
                res.id,
                res.realURL,
                res.shortURL,
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
            if (err) console.log("Error "+err);
            console.log({id : result.insertId,realURL,shortURL})
            producer([
                "Created",
                result.insertId,
                realURL,
                shortURL,
            ]);
        })
        db.end((err) => console.log("Connection closed"));        
    }

 

}

module.exports = Queries;
