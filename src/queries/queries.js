//  loading modules
const connection = require('../connection/connection') 
const sql = require('../queries/sql')
const producer = require('../producer');

class Queries {  //     class for all querries

        Delete(id){   //    function for delete shorturl by ID using Promises
        return new Promise((resolve, reject) => {
        var res;  //    Helper variable - using for sending message to redirection service with RabbitMQ
        const db=  connection.createConn();   
        db.query(sql.select,[id],(err,result) => {   
            if (err) console.log("Error "+err);
            res = result[0];
        })
        db.query(sql.delete,id,(err,result) => {    	// delete query with parameters ID

            if (err) console.log("Error "+err);
            if(result.affectedRows>0)  {        //  check if ID exist
            console.log('deleted')
            resolve(
            producer([      //  if ID exist resolve producer message in array
                "Deleted",
                res.id,
                res.realURL,
                res.shortURL,
            ]))
            }
            else
            reject(new Error("Result is undefined."));      // if id not exist reject
        })

        db.end((err) => console.log("Connection closed"));   //close connection with db    
    })
    }

    async Create(realURL,shortURL) {    //function for create new shortURL 
        return new Promise((resolve, reject) => {
        const db=  connection.createConn();
        db.query(sql.create,[realURL,shortURL],(err,result) => { // create query with parametrs realURL and ShortURL
            if(result) {    	// if short url is created
            console.log('Created')
            console.log({id : result.insertId,realURL,shortURL})
            resolve(    // if is created send message in array
            producer([
                "Created",
                result.insertId,
                realURL,
                shortURL,
            ]))
            }
            else
            reject(new Error("Error shortURL not Created")); // reject if shortURL is not created succesfully

        })
        db.end((err) => console.log("Connection closed"));  //  close connectio with db
    })
    }


}

module.exports = Queries;
