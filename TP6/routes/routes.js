var express = require('express');
var router = express.Router();
var Question = require('../models/question');
var statsExam = require('../models/statsExam.js');  //added by GT
var statsTest = require('../models/statsTest.js');  //added by GT

/* GET home page. */
router.get('/', function(req, res) {

    statsTest.addStatsExam('dom','sdflsdkf','sdfsldf',function(err,element){
    });

    statsTest.getAverageStat(function(res){
        console.log("salut : " + element);
    });
    res.render('accueil');
});

// route qui me permet de récuperer le nombre de questions par domaine
router.get('/getNumberOfQuestionsDomaine', function(req,res){
    var domaines = [];
    Question.getNumberOfQuestions("HTML", function(error, elementhtml){
        Question.getNumberOfQuestions("CSS", function(error, elementcss){
                Question.getNumberOfQuestions("JS", function(error, elementjs){
                    if(elementhtml){
                        domaines.push(elementhtml);
                    }
                    else{
                        domaines.push(0);
                    }
                    if(elementcss){
                        domaines.push(elementcss);
                    }
                    else{
                        domaines.push(0);
                    }
                    if(elementjs){
                        domaines.push(elementjs);
                    }
                    else{
                        domaines.push(0);
                    }
                    res.json({domaines: domaines});
                });
            });
    });
});

router.get('/getRandomQuestion', function(req,res){
    Question.getRandomQuestion(function(err, qa) {
        console.log("test");
        if (err) {
            res.send(err);
        }
        res.json({ idQuestion: qa._id , question: qa.question, domain: qa.domain,  answers: qa.answers } );
    });
});

router.get('/tableauBord', function(req, res) {
    res.render('tableauBord');
});


router.get('/getCorrectAnswer/:id',function(req,res){
    Question.getQuestionById({_id: req.params.id}, function(error,element){
        if(element){
            res.json({correctAnswer: element.correctAnswer});}
        else{
            res.send(error);
        }
    });
});

router.get('/question', function(req, res) {
    res.render('question', { title: "Test rapide", type: "Test" } );
});

router.get('/questionExamen', function(req, res) {
    res.render('question', { title: "Examen Officiel", type: "Exam" } );
});


router.get('/getQuestion', function(req,res){
    Question.getQuestionById(req.session.ids[req.session.currentQAIndex], function(err, qa) {
        if (err) {
            res.send(err);
        }
        req.session.currentQAIndex=req.session.currentQAIndex+1;
        res.json({ idQuestion: qa._id , question: qa.question, domain: qa.domain,  answers: qa.answers, numQuestions: numQuestions} );
    });
});

router.post('/questionExamen', function(req, res) {
    var domains = [].concat(req.body.domain);
    var numQuestions = req.body.numQuestions;
    req.session.domains = domains;
    Question.getRandomIDs(domains,numQuestions,function(err,element){
        
        req.session.currentQAIndex = 0;
        req.session.ids=element;
        res.redirect("/questionExamen");
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
    var domain = req.session.domain;
    var question = req.session.question;
    var answers = [].concat(req.session.answer);
    var correctAnswer = req.session.goodAnswer;

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



// added by GT : Met à jour la note examen dans la bd collection statsExam

router.post('/examenTermine', function(req, res) {
    var domains = [].concat(req.session.domains);
    var goodAnswers = req.session.goodAnswers;
    var totalAnswers = req.session.totalAnswers;
   
    StatsExam.addStatsExam(domains, goodAnswers, answers, totalAnswers, function(err) {
        if (err) {
            res.send(err);
        }
        res.redirect('/examenTermine');
    });
});


// Module exports
module.exports = router;
