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
var mesDomainesExamen=[];
var nbQuestionsExamen=null;
var numQuestion=0;
var questionsPasses=[];

/*

  Variables pour les tests rapides

 */
var maQuestion=null;
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
  error=false;
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
    mesDomainesExamen=[];
    for (var i = 0; i < req.param('maCB').length; i++) {
      if(!isNaN(parseFloat(req.param('maCB')[i])) && isFinite(req.param('maCB')[i])){
        mesDomainesExamen.push(parseInt(req.param('maCB')[i] ));
      }
    };
    nbQuestionsExamen = req.param('nbQuestions') ;
    numQuestion=1;
    questionsPasses=[];
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

  if(numQuestion <= db.getNumQuestions(mesDomainesExamen) && numQuestion<=nbQuestionsExamen){
    maQuestion = db.getRandomQuestion(mesDomainesExamen,questionsPasses);
    monDomaine = db.getNameDomaineFromID(maQuestion.domaine);
    questionsPasses.push(parseInt(maQuestion.id));
    res.render('examen', { title: 'Examen' , JS: 'examen', question: maQuestion, numeroQuestion : numQuestion, domaine : monDomaine});
  }
  else{
    res.redirect('/tableauDeBord');
  }
});

router.post('/examen', function (req, res) {
  numQuestion++;
  res.redirect('/examen');
});

/* 

  GET test rapide 

*/
router.get('/testRapide', function (req, res) {
  maQuestion = db.getRandomQuestion();
  //console.log(maQuestion.reponses);
  res.render('testRapide', { title: 'Test Rapide' , JS: 'testRapide', question: maQuestion});
});

router.post('/testRapide', function (req, res) {
  console.log(req.param('optionsRadios'));
  res.redirect('/testRapide');
});


module.exports = router;
