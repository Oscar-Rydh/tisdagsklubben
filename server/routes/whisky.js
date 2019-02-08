var express = require('express');
var router = express.Router();
var connection = require('../database/database')


router.get('/', function(req, res, next){
  connection.query('SELECT * from whiskies', function(error, results, fields) {
    if (error) {
      console.log(error)
      console.log("WE GOT ERROR")
      res.json({status: 500})
    } else {
      res.json({status: 200, whiskies: results})
    }
  })
});

router.post('/', function(req, res, next) {
  const body = req.body
  connection.query('INSERT INTO whiskies(\
    namn, namn2, typ, ursprunglandnamn, ursprung, alkoholhalt, volymiml, prisinklmoms, artikelid \
    ) VALUES(?,?,?,?,?,?,?,?,?)', [
      body.namn, 
      body.namn2, 
      body.typ, 
      body.ursprunglandnamn,
      body.ursprung,
      body.alkoholhalt,
      body.volymiml,
      body.prisinklmoms,
      body.artikelid
    ], function (error, results, fields) {
      if (error) {
        res.json({status: 500, msg: 'Could not add whisky'})
      } else {
        res.json({status: 200, msg: 'OK'})
      }
  });
});


module.exports = router;