var express = require('express');
var router = express.Router();
var Question = require('../models/question');
var StatsExam = require('../models/statsExam.js');  //added by GT

/* GET home page. */
router.get('/', function(req, res) {        
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

router.get('/getStatusAnswers', function(req,res){
    res.json({ goodAnswers: req.session.goodAnswer, totalAnswers: req.session.numQuestions });
});

router.get('/getStatusAnswersTest', function(req,res){
    console.log('test');
    if(req.session.goodAnswerTest==null){
        req.session.goodAnswerTest=0;
        req.session.totalAnswersTest=0;
        res.json({ goodAnswers: req.session.goodAnswerTest, totalAnswers: req.session.totalAnswersTest });
    }
    else
        res.json({ goodAnswers: req.session.goodAnswerTest, totalAnswers: req.session.totalAnswersTest });
});

router.get('/getRandomQuestion', function(req,res){
    Question.getRandomQuestion(function(err, qa) {
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

router.get('/getEndExam',function(req,res){
    if(req.session.numQuestions==req.session.currentQAIndex){
        res.json({ end: true });
    }
    else{
        res.json({ end: false });
    }
});

router.get('/question', function(req, res) {
    res.render('question', { title: "Test rapide", type: "Test" } );
});

router.get('/questionExamen', function(req, res) {
    res.render('question', { title: "Examen Officiel", type: "Exam" } );
});


router.get('/getQuestion', function(req,res){
    // je récupere la question courante
    Question.getQuestionById(req.session.ids[req.session.currentQAIndex], function(err, qa) {
        if (err) {
            res.send(err);
        }
        req.session.currentQAIndex=req.session.currentQAIndex+1;
        res.json({ idQuestion: qa._id , question: qa.question, domain: qa.domain,  answers: qa.answers} );
    });

});

router.post('/questionExamen', function(req, res) {
    var domains = [].concat(req.body.domain);
    req.session.numQuestions = req.body.numQuestions;
    req.session.domains = domains;
    Question.getRandomIDs(domains,req.session.numQuestions,function(err,element){
        req.session.currentQAIndex = 0;
        req.session.goodAnswer=0;
        req.session.ids=element;
        res.redirect("/questionExamen");
    });


});


router.get('/addTotalAnswerTest', function(req,res) {
    console.log(req.session.totalAnswersTest);
    if(req.session.totalAnswersTest!=null){
        req.session.totalAnswersTest=req.session.totalAnswersTest+1;
    }
    else{
        req.session.totalAnswersTest=0;
    }    
    res.json();
});

router.get('/addGoodAnswer', function(req,res) {
    req.session.goodAnswer=req.session.goodAnswer+1;
    res.json();
});

router.get('/examenTermine', function(req, res) {
    var domains = req.session.domains;
    StatsExam.addStatsExam(domains, req.session.goodAnswer, req.session.numQuestions, function(err) {
        if (err) {
            res.send(err);
        }
        res.render('examenTermine', { domains: JSON.stringify(domains), goodAnswers: req.session.goodAnswer, totalAnswers: req.session.numQuestions } );
    });
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
        res.json({ message: 'Question créée!' });
    });
});

router.get('/ajouterTousLesQuestions', function(req, res) {
    Question.addAllQuestions();
    res.render('ajouterQuestion');
});


//added by GT : TESTER l'ajout des notes d'examen avec la page essaiAjoutNoteBD
router.get('/essaiAjoutNoteBD', function(req, res) {
    res.render('essaiAjoutNoteBD');
});



// Module exports
module.exports = router;
