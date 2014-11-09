var express = require('express');
var router = express.Router();
var db = require('../lib/db');

/*

  Variables pour les messages d'erreur pour le tableau de bord

*/
var error =false;
var msgError="";

/*

  Variables pour les Examen

*/
var mesDomainesExamen=null;
var nbQuestionsExamen=null;

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

  var domaines = db.getAllDomaines();
  if(!error){
    res.render('tableauDeBord', { title: 'Mon tableau de bord' , JS: 'tdb', domaines: domaines});
  }
  else{
    res.render('tableauDeBord', { title: 'Mon tableau de bord' , JS: 'tdb', domaines: domaines, error: true, message: msgError});
    error=false;
    msgError="";
  }
});

router.post('/tableauDeBord', function (req, res) {
  // contrôle saisie
  
  // controle si la case été coché
  if(typeof req.param('maCB') == 'undefined'){
    error = true;
    msgError = "Il faut cocher au moins un domaine de question";
  }
  // controle si on prend assez de paramèters
  if(!error && (req.param('nbQuestions')<1 || req.param('nbQuestions')>10)){
    error=true;
    msgError = "Nombre de questions invalide.";
  }

  if(error){
      // je redirige en GET sur le tableau de bord s'il y a une erreur
    res.redirect('/tableauDeBord');
  }
  else{
    // j'enregistre les valeurs pour pouvoir récuperer les valeurs dans la page examen
    mesDomainesExamen =req.param('maCB') ;
    nbQuestionsExamen = req.param('nbQuestions') ;
    // redirection en GET sur la page d'examen
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
  res.render('examen', { title: 'Examen' , JS: 'examen'});
});


/* 

  GET test rapide 

*/
router.get('/testRapide', function (req, res) {
  var maQuestion = db.getRandomQuestion();
  console.log(maQuestion.reponses);
  res.render('testRapide', { title: 'Test Rapide' , JS: 'testRapide', question: maQuestion});
});

module.exports = router;
