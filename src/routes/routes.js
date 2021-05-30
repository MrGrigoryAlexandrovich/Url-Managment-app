//loading dependencies and modules
const express = require("express");
const router = express();
const Queries = require("../queries/queries");
const queries = new Queries();
const config = require("../../config");
const isUrl = require("is-valid-http-url");

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
      config.redirection+ URLS.shortURL
    );
    return res.status(201).json({
      id: result,
      realURL: URLS.realURL,
      shortURL: config.redirection + URLS.shortURL,
    });
  } else res.status(403).end("Not Valid URL");
});

module.exports = router;
