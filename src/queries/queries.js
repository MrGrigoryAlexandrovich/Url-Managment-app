//                  loading connection, modules and shortid dependency
const connection = require('../connection/connection') 
const sql = require('../queries/sql')
const producer = require('../rabbitmq-producer/producer')
const shortid = require('shortid')

 //                 class for all querries to DB
class Queries { 
        
//                  function for delete shorturl by ID using Promises
        Delete(id){   
        return new Promise((resolve, reject) => {
        const db=  connection.createConn()   

 //                  Helper variable - using for sending message to redirection service with RabbitMQ
        var res;  
        db.query(sql.select,[id],(err,result) => {   
            if (err) {
                console.log(err)
                throw er
            }
            res = result[0]
        })

//                      delete query with parameters ID
        db.query(sql.delete,id,(err,result) => {    	

//                      check if ID exist - > rows > 0
            if(result.affectedRows>0)  {       
          
//                      if ID exist resolve producer message in array  -> producing to rabbitmq
            resolve(
            producer([     
                "Deleted",
                res.id,
                res.realURL,
                res.shortURL,
            ]))
            }
            else
            reject(new Error("ID NOT EXIST OR ERROR")) 
        })

        db.end()
    })
    }

//                      function for create new shortURL 
    async Create(realURL,shortURL) {    
        return new Promise((resolve, reject) => {
        const db=  connection.createConn()   

//                      create query with parametrs realURL and ShortURL
        db.query(sql.create,[realURL,shortURL],(err,result) => { 

//                       if short url is created
            if(result) {
                
 //                     if is created send message in array  -> producing to rabbitmq and resolve
            resolve(result.insertId,realURL,shortURL)
            producer([
                "Created",
                result.insertId,
                realURL,
                shortURL,
            ])
            }

//                      else -> reject if shortURL is not created succesfully
            else
            reject(new Error("Error shortURL not Created"))

        })
        db.end()
    })
    }

//                       function to generate uniqid
    unqid(id) {                                     
        const db=  connection.createConn()   
        
//                      format of shorturl + shortid
        id+=shortid.generate()                     

 //                     query to check if shortURL exist
        db.query(sql.selecturl,id,(err,result) => {    

//                      if  result length is >0 shortURL exist    
            if(result.length>0) {

//                      remove existed shortid - prepare for recursion 
            id = id.substring(0,22)                

//                      call function again - recursion function because ID exist
            return this.unqid(id)                          
            }
            })
    db.end()
    return id
    }

}

module.exports = Queries
