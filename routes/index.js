var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'WebQuiz' , JS: 'acceuil'});
});

/* GET tableau de bord */
router.get('/tableauDeBord', function (req, res) {
  res.render('tableauDeBord', { title: 'Mon tableau de bord' , JS: 'tdb'});
});

/* GET instructions */
router.get('/instructions', function (req, res) {
  res.render('instructions', { title: 'Instructions' , JS: 'instructions'});
});

/* GET resultat */
router.get('/resultat', function (req, res) {
  res.render('resultat', { title: 'Resultat' , JS: 'resultat'});
});

/* GET examen */
router.get('/examen', function (req, res) {
  res.render('examen', { title: 'Examen' , JS: 'examen'});
});

/* GET test rapide */
router.get('/testRapide', function (req, res) {
  res.render('testRapide', { title: 'Test Rapide' , JS: 'testRapide'});
});

module.exports = router;
