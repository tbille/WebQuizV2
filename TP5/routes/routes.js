var express = require('express');
var router = express.Router();
var questions = require('../models/question');

/* GET home page. */
router.get('/', function(req, res) {
    questions.ajouterToutesLesQuestions();
    res.render('accueil');
});

router.get('/tableauBord', function(req, res) {
    res.render('tableauBord');
});

router.get('/question', function(req, res) {
    var qa = db.getRandomQuestion();
    res.render('question', { title: "Test rapide", type: "Test", qa: qa } );
});

router.get('/questionExamen', function(req, res) {
    var ids = req.session.ids;
    var id = ids[req.session.currentQAIndex];
    var qa = db.getQuestionById(id);
    req.session.currentQAIndex = req.session.currentQAIndex + 1;
    res.render('question', { title: "Examen Officiel", type: "Exam", ids: ids, qa: qa } );
});

router.post('/questionExamen', function(req, res) {
    var domains = [].concat(req.body.domain);
    req.session.domains = domains;
    var numQuestions = req.body.numQuestions;
    req.session.currentQAIndex = 0;
    req.session.ids = db.getRandomIDs(domains, numQuestions);
    res.redirect('/questionExamen');
});

router.get('/examenTermine', function(req, res) {
    var domains = req.session.domains;
    res.render('examenTermine', { domains: JSON.stringify(domains) } );
});

router.get('/instruction', function(req, res) {
    res.render('instruction');
});

router.get('/ajouterQuestion', function(req, res) {
    res.render('ajouterQuestion');
});

module.exports = router;
