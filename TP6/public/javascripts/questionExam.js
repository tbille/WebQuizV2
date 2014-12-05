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
