//  loading dependencies and modules
const express = require('express');
const Queries = require('../queries/queries')
const router = express();
const queries = new Queries();
const connection = require('../connection/connection');

//  routes delete

router.delete('/delete/:id',(req,res) => {
    queries.Delete(req.params.id);
    res.sendStatus(200);
}); 
//  routes create
router.post('/create',(req,res) => {
    let URLS = {
    realURL  :req.body.realURL,
    shortURL : queries.unqid(req.protocol+'://'+req.headers.host+'/')
    };
    queries.Create(URLS.realURL,URLS.shortURL);
    res.status(200).json(URLS);
});

module.exports = router;

