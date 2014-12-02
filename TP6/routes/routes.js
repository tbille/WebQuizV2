var express = require('express');
var router = express.Router();
var Question = require('../models/question');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('accueil');
});

router.get('/tableauBord', function(req, res) {
    res.render('tableauBord');
});

router.get('/question', function(req, res) {
    Question.getRandomQuestion(function(err, qa) {
        if (err) {
            res.send(err);
        }
        console.log(qa);
        res.render('question', { title: "Test rapide", type: "Test", qa: qa } );
    });
});

router.get('/questionExamen', function(req, res) {
    var ids = req.session.ids;
    var id = ids[req.session.currentQAIndex];
    Question.getQuestionById(id, function(err, qa) {
        if (err) {
            res.send(err);
        }
        console.log(qa);
        req.session.currentQAIndex = req.session.currentQAIndex + 1;
        res.render('question', { title: "Examen Officiel", type: "Exam", numQuestions: ids.length, qa: qa } );
    });
});

router.post('/questionExamen', function(req, res) {
    var domains = [].concat(req.body.domain);
    req.session.domains = domains;
    var numQuestions = req.body.numQuestions;
    req.session.currentQAIndex = 0;

    Question.getRandomIDs(domains, numQuestions, function(err, questionIDs) {
        if (err) {
            res.send(err);
        }
        req.session.ids = questionIDs;
        res.redirect('/questionExamen');
    });
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

router.post('/ajouterQuestion', function(req, res) {
    var domain = req.body.domain;
    var question = req.body.question;
    var answers = [].concat(req.body.answer);
    var correctAnswer = req.body.goodAnswer;

    Question.addQuestion(domain, question, answers, correctAnswer, function(err, question) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Question créé!' });
    });
});

router.get('/ajouterTousLesQuestions', function(req, res) {
    Question.addAllQuestions();
    res.render('ajouterQuestion');
});

module.exports = router;
