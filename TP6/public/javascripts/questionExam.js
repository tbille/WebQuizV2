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