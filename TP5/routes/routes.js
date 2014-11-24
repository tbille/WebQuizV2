var express = require('express');
var router = express.Router();
var db = require('../models/question');

/* GET home page. */
router.get('/', function(req, res) {
 //db.ajouterToutesLesQuestions();

//    Questions.getRandomQuestion(function(element){ console.log(element);});

     //Questions.getRandomIDs(["HTML","CSS"], 2, function(element){console.log(element);});

    res.render('accueil');
});

router.get('/tableauBord', function(req, res) {
    db.numberQuestionsDomaine("HTML", function(html){
        db.numberQuestionsDomaine("CSS", function(css){
            db.numberQuestionsDomaine("Javascript", function(js){
                res.render('tableauBord',{js: js , css: css, html: html});
            });
        });
    });
    
}); 

router.get('/question', function(req, res) {
    var qa;
    db.getRandomQuestion(function(element){ qa=element;
        res.render('question', { title: "Test rapide", type: "Test", qa: qa } );

    });
    
    
});

router.get('/questionExamen', function(req, res) {
    var ids = req.session.ids;
    var id = ids[req.session.currentQAIndex];
    var qa;
console.log(ids);
    db.getQuestionById(id, function(element){ 
        qa=element;
        req.session.currentQAIndex = req.session.currentQAIndex + 1;
        console.log(qa);
        res.render('question', { title: "Examen Officiel", type: "Exam", ids: ids, qa: qa } );

    });
});

router.post('/questionExamen', function(req, res) {
    var domains = [].concat(req.body.domain);
    req.session.domains = domains;
    var numQuestions = req.body.numQuestions;
    req.session.currentQAIndex = 0;
    
    db.getRandomIDs(domains, numQuestions, function(element){
        req.session.ids= element;
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
    db.ajouterToutesLesQuestions();
    res.render('ajouterQuestion');
});


/* Lorsqu'on clique sur le bouton "Ajouter la question" de la page ajouterQuestion, les données vont être postés à '/ajouterToutesQuestions' */
router.get('/ajouterToutesQuestions', function(req, res) {
    res.render('ajouterQuestion');
});

router.post('/ajouterToutesQuestions', function(req, res) {
  var domain = req.value.domain;
  var question = req.body.question;
  var correctAnswer = req.body.correctAnswer;
  var answers = req.body.answers;
  
console.log("before call");
Questions.ajouterQuestion(domain, question, correctAnswer, answers, function(err) {
    if (err) throw err; 
    res.redirect('/ajouterQuestion');
  });  
});


module.exports = router;
