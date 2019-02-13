var express = require('express');
var router = express.Router();
var connection = require('../database/database')


function getWhiskies(callback) {
  connection.query('SELECT * from whiskies', function(error, results, fields) {
    if (error) {
      return callback(error, undefined)
    } else {
      return callback(undefined, results)
    }
  })
  
}

router.get('/', function(req, res, next){
  getWhiskies(function(error, result) {
    if (error) {
      res.json({status: 500, msg: error})
    } else {
      res.json({status: 200, whiskies: result})
    }
    connection.end();
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
      connection.end();
  });
});

router.delete('/', function(req, res, next) {
  const body = req.body
  connection.query('DELETE FROM whiskies WHERE \
    namn = ? AND namn2 = ? AND typ = ? AND ursprunglandnamn = ? AND ursprung = ? AND \
     alkoholhalt = ? AND volymiml = ? AND prisinklmoms = ? AND artikelid = ?', [
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
        res.json({status: 500, msg: 'Could not remove whisky'})
      } else {
        getWhiskies(function(error, result) {
          if (error) {
            res.json({status: 500, msg: error})
          } else {
            res.json({status: 200, whiskies: result})
          }
          connection.end();
        })
      }
  });
});


module.exports = router;