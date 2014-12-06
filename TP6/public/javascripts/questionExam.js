/*
// Actions à poser dès que le document est chargé
$(document).ready(function() {
    // Mettre à jour les statistiques courantes
    updateStats();

    // Choisir la question à poser
    var indexCourant = parseInt($("span#totalAnswers").text());
    
    // Action à poser lorsque l'utilisateur clique sur le bouton «Correction»
    $("a.correct").click(function() {
        // Valider la bonne ou mauvaise réponse
        var checkedRadio = $('input[name=answer]:checked');
        if (checkedRadio.val() == correctAnswer) {
            $(checkedRadio).parent().css("background-color", "lightgreen");
            
            // Ajout d'une bonne réponse dans le score
            var goodAnswers = localStorage["quiz.stat.currentExam.goodAnswers"];
            localStorage["quiz.stat.currentExam.goodAnswers"] = parseInt(goodAnswers) + 1;
        } else {
            $(checkedRadio).parent().css("background-color", "red");
            $("input[value=" + correctAnswer + "]").parent().css("background-color", "lightgreen");
        }

        // Mettre à jour les statistiques courantes
        var totalAnswers = localStorage["quiz.stat.currentExam.totalAnswers"];
        localStorage["quiz.stat.currentExam.totalAnswers"] = parseInt(totalAnswers) + 1;
        updateStats();

        var nextHTML = "";
        if (indexCourant < numQuestions - 1) {
            $(this).text("Question suivante");
            nextHTML = "/questionExamen";
        } else {
            $(this).text("Terminé");
            nextHTML = "/examenTermine";
        }
        $(this).removeClass("correct");
        $(this).addClass("next");
        $(this).unbind("click");

        $("a.next").click(function() {
            $(this).attr("href", nextHTML);
        });
    });

    $("a.abandon").click(function() {
        localStorage["quiz.stat.currentExam.totalAnswers"] = numQuestions;
    });
  
});


// Met à jour la note courante de l'utilisateur selon les données contenues dans le localStorage
function updateStats() {
    $("span#goodAnswers").text(localStorage["quiz.stat.currentExam.goodAnswers"]);
    $("span#totalAnswers").text(localStorage["quiz.stat.currentExam.totalAnswers"]);
}
*/


var app = angular.module("monApp",[]);
var myId;
app.controller("questionC",function($scope,$http,questionS){
    $scope.getQuestion=function(){
        questionS.getQuestionID($http,function(maquestion){
            myId=maquestion.idQuestion;
            $scope.question=maquestion.question;
            $scope.domain=maquestion.domain;
            $scope.answers=maquestion.answers;
        });
    };
    $scope.correctionQuestion=function(){
        if($("a.correct").text()=="Corriger"){
            questionS.corriger($http, function(correction){
                // Valider la bonne ou mauvaise réponse
                var checkedRadio = $('input[name=answer]:checked');
                if (checkedRadio.val() == correction) {
                    $(checkedRadio).parent().css("background-color", "lightgreen");
                    
                    // Ajout d'une bonne réponse dans le score
                    //var goodAnswers = localStorage["quiz.stat.currentTest.goodAnswers"];
                    //localStorage["quiz.stat.currentTest.goodAnswers"] = parseInt(goodAnswers) + 1;
                } 
                else {
                    $(checkedRadio).parent().css("background-color", "red");
                    $("input[value=" + correction + "]").parent().css("background-color", "lightgreen");
                }
                $("a.correct").text("Question suivante");
                $("a.correct").addClass("next");
                $("a.correct").removeClass("correct");
                

            });
        }
        else if($("a.next").text()=="Question suivante"){
            if(numQuestions){
                $("a.next").addClass("correct");
                $("a.next").removeClass("next");
                $("a.correct").text("Corriger");
                $scope.getQuestion();
            }
            else{
                
            }
        }
        else{
            
        }
    };
});

app.service("questionS",function(){
    this.getQuestionID = function($http,callback){
        $http.get("/getQuestion").success(function(data){
            callback(data);
        }).error(function(){
            alert("Erreur : redirection");
        });
    };
    this.corriger=function($http,callback){
        $http.get("/getCorrectAnswer/"+myId).success(function(data){
            callback(data.correctAnswer);
        }).error(function(){
            alert("Erreur : redirection")
        });
    };
});