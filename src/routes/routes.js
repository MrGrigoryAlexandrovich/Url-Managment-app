//          loading dependencies and modules
const express = require('express')
const router = express()
const Queries = require('../queries/queries')
const queries = new Queries()

//          routes delete if ID exist sendStatus 200 - if not 404 
router.delete('/delete/:id',(req,res) => {
    queries.Delete(req.params.id)
    .then(result => {
        res.sendStatus(200)
    })
    .catch(err=> {
        res.status(404).end('ID NOT FOUND') 
    })
})

//          routes create
router.post('/create',(req,res) => {
    let URLS = {
    realURL  : req.body.realURL,
    shortURL : queries.unqid(req.protocol+'://'+req.headers.host+'/')
    }
    
    //if inserted realURL is not string send status 400 -> else call query end send status 201 with URLS objects
    if(typeof(URLS.realURL) != 'string')
    res.status(400).end('Field Type must be String')
    else {
    queries.Create(URLS.realURL,URLS.shortURL)
    .then(result => {
        res.status(201).json(URLS)
    })
    .catch(err=> {
    res.status(400).end(err) 
    })
}
})

module.exports = router

