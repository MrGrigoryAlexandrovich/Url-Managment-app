//  loading dependencies and modules
const express = require('express');
const Queries = require('../queries/queries')
const router = express();
const queries = new Queries();

//  routes delete
router.delete('/delete/:id',(req,res) => {
    queries.Delete(req.params.id)
    .then(result => {
        res.sendStatus(200)
    })
    .catch(err=> {
        res.status(404).end('ID NOT FOUND') 
    }
    )
}); 

//  routes create
router.post('/create',(req,res) => {
    let URLS = {
    realURL  :req.body.realURL,
    shortURL : queries.unqid(req.protocol+'://'+req.headers.host+'/')
    };
    if(typeof(URLS.realURL) != 'string')
    res.status(400).end('Field Type must be String')
    else
    {
    queries.Create(URLS.realURL,URLS.shortURL)
    .then(result => {
        res.sendStatus(201)
    })
    .catch(err=> {
        res.status(400).end(err) 
    })
}
});

module.exports = router;

