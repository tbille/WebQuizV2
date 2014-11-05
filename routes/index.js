var express = require('express');
var router = express.Router();
var db = require('../lib/db');

var error =false;
var msgError="";

/* 

  GET home page. 

*/
router.get('/', function (req, res) {
  res.render('index', { title: 'WebQuiz' , JS: 'acceuil'});
});


/* 

  GET tableau de bord 

*/
router.get('/tableauDeBord', function (req, res) {
  if(!error){

    var domaines = db.getAllDomaines();

    res.render('tableauDeBord', { title: 'Mon tableau de bord' , JS: 'tdb', domaines: domaines});
  }
  else{
    res.render('tableauDeBord', { title: 'Mon tableau de bord' , JS: 'tdb', error: true, message: msgError});
    error=false;
    msgError="";
  }
  console.log(getNameDomaineFromID(1));
});

router.post('/tableauDeBord', function (req, res) {
  // contrôle saisie
  if(req.param('nbQuestions')<1 || req.param('nbQuestions')>10){
    error=true;
    msgError = "Nombre de questions invalide."
    res.redirect('/tableauDeBord');
  }
  else{
    tesst = req.param('nbQuestions');
    res.redirect('/examen');
  }
});


/*

  GET instructions 

*/
router.get('/instructions', function (req, res) {
  res.render('instructions', { title: 'Instructions' , JS: 'instructions'});
});


/*

  GET resultat 

*/
router.get('/resultat', function (req, res) {
  res.render('resultat', { title: 'Resultat' , JS: 'resultat'});
});


/* 

  POST examen 

*/
router.get('/examen', function (req, res) {
  console.log("nb Questiosns : "  + tesst);
  res.render('examen', { title: 'Examen' , JS: 'examen'});
});


/* 

  GET test rapide 

*/
router.get('/testRapide', function (req, res) {
  res.render('testRapide', { title: 'Test Rapide' , JS: 'testRapide'});
});

module.exports = router;
