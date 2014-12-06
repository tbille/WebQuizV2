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
            questionS.getStatus($http,function(status){
                $scope.goodAnswers=status.goodAnswers;
                $scope.totalAnswers=status.totalAnswers;
                myId=maquestion.idQuestion;
                $scope.question=maquestion.question;
                $scope.domain=maquestion.domain;
                $scope.answers=maquestion.answers;
            });
        });
    };
    $scope.correctionQuestion=function(){
        if($("a.correct").text()=="Corriger"){
            questionS.corriger($http, function(correction){
                // Valider la bonne ou mauvaise réponse
                var checkedRadio = $('input[name=answer]:checked');
                if (checkedRadio.val() == correction) {
                    questionS.addGood($http,function(){

                            $(checkedRadio).parent().css("background-color", "lightgreen");
                        });

                } 
                else {
                    $(checkedRadio).parent().css("background-color", "red");
                    $("input[value=" + correction + "]").parent().css("background-color", "lightgreen");
                }

                questionS.endExam($http, function(element){
                    if(!element){
                        $("a.correct").text("Question suivante");
                        $("a.correct").addClass("next");
                        $("a.correct").removeClass("correct");
                    }
                    else{
                        $("a.correct").text("Terminé");
                        $("a.correct").removeAttr('ng-click');
                        $("a.correct").attr("href", "/examenTermine");
                    }
                });
                
            
            });
        }
        else if($("a.next").text()=="Question suivante"){
            $("a.next").addClass("correct");
            $("a.next").removeClass("next");
            $("a.correct").text("Corriger");
            $scope.getQuestion();
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
    this.endExam=function($http,callback){
        $http.get("/getEndExam").success(function(data){
            callback(data.end);
        }).error(function(){
            alert("Erreur : endExam")
        });
    };
    this.addGood=function($http,callback){
        $http.get("/addGoodAnswer").success(function(data){
            callback();
        }).error(function(){
            alert("Erreur : endExam")
        });
    };
    this.getStatus=function($http,callback){
        $http.get("/getStatusAnswers").success(function(data){
            callback(data);
        }).error(function(){
            alert("Erreur : endExam")
        });

        
    }
});