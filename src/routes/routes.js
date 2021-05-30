//loading dependencies and modules
const express = require("express");
const router = express();
const Queries = require("../queries/queries");
const queries = new Queries();
const config = require("../../config");
const isUrl = require("is-valid-http-url");
const producer = require("../rabbitmq-producer/producer");

//routes delete if ID exist sendStatus 200 - if not 404
router.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  let message = await queries.getURL(id);
  if (message) {
    let result = await queries.Delete(id);
    producer(["Deleted", id, message.realURL, message.shortURL]);
    return res.sendStatus(202);
  } else return res.sendStatus(404);
});
//routes create
router.post("/create", async (req, res) => {
  let URLS = {
    realURL: req.body.realURL,
    shortURL: await queries.random(),
  };
  //if inserted realURL is not string send status 400 -> else call query end send status 201 with URLS objects
  if (isUrl(URLS.realURL)) {
    let result = await queries.Create(
      URLS.realURL,
      config.redirection + URLS.shortURL
    );
    producer(["Created", result, URLS.realURL, URLS.shortURL]);
    return res.status(201).json({
      id: result,
      realURL: URLS.realURL,
      shortURL: config.redirection + URLS.shortURL,
    });
  } else res.status(400).end("Not Valid URL");
});

module.exports = router;
