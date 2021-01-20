//loading dependencies and modules
const express = require('express')
const router = express()
const Queries = require('../queries/queries')
const queries = new Queries()
const config = require('../../config')
const isUrl = require("is-valid-http-url");

//routes delete if ID exist sendStatus 200 - if not 404 
router.delete('/delete/:id',(req,res) => {
    queries.Delete(req.params.id)
    .then(result => {
        res.sendStatus(200)
    })
    .catch(err=> {
        res.status(404).end('ID NOT FOUND') 
    })
})
//routes create
router.post('/create',async(req,res) => {
    let URLS = {
    realURL  : req.body.realURL,
    shortURL : await queries.random()
    }
    //if inserted realURL is not string send status 400 -> else call query end send status 201 with URLS objects
    if(isUrl(URLS.realURL)) {
        queries.Create(URLS.realURL,URLS.shortURL)
        .then(result => {
            res.status(201).json({
                "id" : result,
                "realURL" : URLS.realURL,
                "shortURL": config.redirection + URLS.shortURL
            })
        })
        .catch(err=> {
        res.status(400).end(err) 
        })
    }
    else
    res.status(400).end('Not Valid URL')
})

module.exports = router

