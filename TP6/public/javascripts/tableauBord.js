/*// Actions à poser dès que le document est chargé
$(document).ready(function() {

    // Mise à jour des statistiques globales de l'utilisateur
    updateUserGlobalState();

    // On met à jour le score des tests rapides
    updateQuickTest();

    // On met à jour le score des examens
    updateExamList();


    // Supprime les statistiques enregistrées de l'utilisateur
    $("a#reset").click(function() {
        localStorage.clear();
    });
});

*/
/*
On met à jour les statistiques globales du joueur à travers le localStorage.

function updateUserGlobalState() {
    var goodCurrentAnswers = localStorage["quiz.stat.currentTest.goodAnswers"];
    var totalCurrentAnswers = localStorage["quiz.stat.currentTest.totalAnswers"];
    var goodAnswers = localStorage["quiz.stat.quicktest.goodAnswers"];
    var totalAnswers = localStorage["quiz.stat.quicktest.totalAnswers"];
    if (goodCurrentAnswers != undefined && totalCurrentAnswers != undefined) {
        if (goodAnswers == undefined || totalAnswers == undefined) {
            localStorage["quiz.stat.quicktest.goodAnswers"] = goodCurrentAnswers;
            localStorage["quiz.stat.quicktest.totalAnswers"] = totalCurrentAnswers;
        } else {
            localStorage["quiz.stat.quicktest.goodAnswers"] = parseInt(goodAnswers)
                + parseInt(goodCurrentAnswers);
            localStorage["quiz.stat.quicktest.totalAnswers"] = parseInt(totalAnswers)
                + parseInt(totalCurrentAnswers);
        }
    }

    localStorage["quiz.stat.currentTest.goodAnswers"] = 0;
    localStorage["quiz.stat.currentTest.totalAnswers"] = 0;
    localStorage["quiz.stat.currentExam.goodAnswers"] = 0;
    localStorage["quiz.stat.currentExam.totalAnswers"] = 0;
}
*/
/*
On met à jour la note globale pour l'ensemble des tests rapides effectués.

function updateQuickTest() {
    $("span#quickTestGood").text(localStorage["quiz.stat.quicktest.goodAnswers"]);
    $("span#quickTestTotal").text(localStorage["quiz.stat.quicktest.totalAnswers"]);
}
*/
/*
Cette fonction s'occupe de remplir la liste d'examens effectué par l'étudiant.

function updateExamList() {
    if (localStorage["quiz.exams.taken"] == undefined) {
        localStorage["quiz.exams.taken"] = JSON.stringify([]);
    }

    var examAverage = 0;
    var examsTaken = JSON.parse(localStorage["quiz.exams.taken"]);
    for (i = 0; i < examsTaken.length; i++) {
        // Modifier la liste d'examen effectuée
        var exam = examsTaken[i];
        var domains = "";
        jQuery.each(exam.domains, function(index, value) {
            domains = domains + " " + value;
        });

        var examStr = "Examen " + (i + 1) + " (" + domains + " ) : " + exam.goodAnswers + " / " 
            + exam.totalAnswers;
        $("section#lightbox ul li:last-child").after("<li>" + examStr + "</li>");

        examAverage += exam.goodAnswers / exam.totalAnswers;
    }

    // Modifier la moyenne des examens
    if (examsTaken.length > 0) {
        var examAverage = (examAverage / examsTaken.length * 100).toFixed(2);
        $("#examAverage").text(examAverage + " %");
    }
}


*/


var app = angular.module("monApp",[]);

app.controller("tdb",function($scope,$http){
    // Page Courante
    $("a#tableauBord").addClass("current");
    // permet d'activer le bouton pour l'examen
    countDomainQuestions($("input[name='domain']:checked"),$http, function(nbQuestions){
        if(nbQuestions>0){
            $scope.disabled = false;
            $("input[type='number']").attr("min", 1);
            $("input[type='number']").attr("max", nbQuestions);
        }
        else
            $scope.disabled = true;
    });
    $scope.disable=function(){
        countDomainQuestions($("input[name='domain']:checked"),$http, function(nbQuestions){
            if(nbQuestions>0){
                $scope.disabled = false;
                $("input[type='number']").attr("min", 1);
                $("input[type='number']").attr("max", nbQuestions);
            }
            else
                $scope.disabled = true;
        });

    }
});




var countDomainQuestions = function(checkedDomains,$http,callback) {
    $http.get("/getNumberOfQuestionsDomaine").success(function(data){
        var domains = jQuery.map(checkedDomains, function(checkbox, i) {
            return $(checkbox).val();
        });
        count=0;
        if (domains.inArray("HTML")) {
            count+=data.domaines[0];
        }
        if (domains.inArray("CSS")) {
            count+=data.domaines[1];
        }
        if (domains.inArray("JS")) {
            count+=data.domaines[2];
        }
        callback(count);
    }).error(function(){
      callback(0);
    });
}

Array.prototype.inArray = function(value) {
    // Returns true if the passed value is found in the
    // array. Returns false if it is not.
    var i;
    for (i = 0; i < this.length; i++) {
        if (this[i] == value) {
            return true;
        }
    }
    return false;
};