/*// Actions à poser dès que le document est chargé
$(document).ready(function() {
    $("a#tableauBord").addClass("current");

    // Mise à jour des statistiques globales de l'utilisateur
    updateUserGlobalState();

    // On met à jour le score des tests rapides
    updateQuickTest();

    // On met à jour le score des examens
    updateExamList();

    // Validation du formulaire d'examen
    var domainCheckboxes = $("input[name='domain']");

    var number = $("input[type='number']");
    domainCheckboxes.click(function() {
        validateForm($("input[name='domain']:checked"), number);
    });
    // Validation du nombre de question
    number.change(function() {
        validateForm($("input[name='domain']:checked"), number);
    });

    // Max nombre de questions en fonction des questions et domaines dans la BD
    // Hardcoder le nb de question max selon un domain - TP6 avec Ajax
    domainCheckboxes.click(function() {
        $("input[type='number']").attr("min", 1);
        $("input[type='number']").attr("max", countDomainQuestions($("input[name='domain']:checked")));
    });

    // Supprime les statistiques enregistrées de l'utilisateur
    $("a#reset").click(function() {
        localStorage.clear();
    });
});

function validateForm(checkedDomains, number) {
    if (parseInt(number.val()) >= 1 && parseInt(number.val()) <= countDomainQuestions(checkedDomains) 
        && number.val().length != 0) {
        
        $("input[type='submit']").attr("disabled", false);
    } else {
        $("input[type='submit']").attr("disabled", true);
    }
}

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
    // permet d'activer le bouton pour l'examen
    $scope.disabled = true;
    $scope.disable=function(){
        var nbQuestions = countDomainQuestions($("input[name='domain']:checked"));
        if(nbQuestions>0)
            $scope.disabled = false;
        else
            $scope.disabled = true;
    }
});




function countDomainQuestions(checkedDomains) {
    var domains = jQuery.map(checkedDomains, function(checkbox, i) {
        return $(checkbox).val();
    });
    var count = 0;
    if (domains.inArray("HTML")) {
        count += 10;
    } 
    if (domains.inArray("CSS")) {
        count += 2;
    }
    return count;
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