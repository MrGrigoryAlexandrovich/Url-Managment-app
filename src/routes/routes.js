//  loading dependencies and modules
const express = require('express');
const db = require('../connection/connection')
const Queries = require('../queries/queries')
const router = express();
const queries = new Queries();
const shortid = require('shortid')
const stringEdit = require('string-edit');

//  routes delete

router.delete('/delete/:id',(req,res) => {
    queries.Delete(req.params.id);
    res.sendStatus(200);
}); 
//  routes create
router.post('/create',(req,res) => {

    let id = stringEdit.shuffle(stringEdit.randomCase(shortid.generate()+new Date().valueOf()));
    let URLS = {
    realURL  :req.body.realURL,
    shortURL : req.protocol+'://'+req.headers.host+'/'+id
    };
    queries.Create(URLS.realURL,URLS.shortURL);
    res.status(200).json(URLS);
}); 

module.exports = router;

/*
function uniqueID(uID)
    {
        const db =  connection.createConn();
        db.query(sql.selecturl,[uID],(err,result) => {
            if (err) console.log("Error "+err);
           if(result[0])
           console.log('EXIST')
           else
           uniqueID(uID)

        })
        
        return uID;
    }
*/
module.exports = router;