//                  loading connection, modules and shortid dependency
const connection = require('../connection/connection') 
const sql = require('../queries/sql')
const producer = require('../rabbitmq-producer/producer')
const shortid = require('shortid')

 //                 class for all querries to DB
class Queries { 
        
//                  function for delete shorturl by ID using Promises
Delete(id) {   
    return new Promise((resolve, reject) => {
    const db=  connection.createConn()   

//                  Helper variable - using for sending message to redirection service with RabbitMQ
    var res;  
    db.query(sql.select,[id],(err,result) => {   
        if (err) {
            console.log(err)
            throw err
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
            if(result)  {
                
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

//                  function for check if shorturl exist in db - > resolve result 
    checkIfExist(id) {
        return new Promise((resolve,reject)=>{
          const db = connection.createConn()
          db.query(sql.selecturl,id,(err,result) =>
          {
            if(err)
            reject(err)
            resolve(result)
          })
          db.end()
        })
        }
       
//             async  function for generating random shortid 
        async random(id) {
         for(;;)
          {

//             in routes.js we create main part of shortURL -> req.protocol+req.headers.host  -> on main part we add shortid
            id+= shortid.generate()

//             store resolve/result of checkIfExist function in variable to check the uniqueness id
            let data = await this.checkIfExist(id)

//            if data.length == [] - > no exist shortURL in database -> break loop      
            if(data.length==[])
            break

//            if shortURL exist substring shortid.generate() part from ID - > for the next loop cycle
            id = id.substring(0,22)   
          }
         return id
      }

}

module.exports = Queries
