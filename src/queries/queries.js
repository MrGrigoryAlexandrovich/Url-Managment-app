//loading connection, modules and shortid dependency
const connection = require("../connection/connection");
const sql = require("../queries/sql");
const shortid = require("shortid");

//class for all querries to DB
module.exports = class Queries {
  //function for create new shortURL
  Create(realURL, shortURL) {
    return new Promise((resolve, reject) => {
      const db = connection.createConn();
      //create query with parametrs realURL and ShortURL
      db.query(sql.create, [realURL, shortURL], (err, result) => {
        //if short url is created
        if (result) {
          //if is created send message in array  -> producing to rabbitmq and resolve
          resolve(result.insertId, realURL, shortURL);
        }
        //else -> reject if shortURL is not created succesfully
        else reject(new Error("Error shortURL not Created"));
      });
      db.end();
    });
  }
  //get single URL
  getURL(id) {
    return new Promise((resolve, reject) => {
      const db = connection.createConn();
      db.query(sql.select, id, (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
      db.end();
    });
  }
  //function for check if shorturl exist in db - > resolve result
  checkIfExist(id) {
    return new Promise((resolve, reject) => {
      const db = connection.createConn();
      db.query(sql.selecturl, id, (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
      db.end();
    });
  }
  //async  function for generating random shortid
  async random(id = shortid.generate()) {
    for (;;) {
      //store resolve/result of checkIfExist function in variable to check the uniqueness id
      let data = await this.checkIfExist(id);
      //if data.length == [] - > no exist shortURL in database -> break loop
      if (data.length == []) break;
      //if shortURL exist substring shortid.generate() part from ID - > for the next loop cycle
      id = id.substring(0, 22);
    }
    return id;
  }
};
