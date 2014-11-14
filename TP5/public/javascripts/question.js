// Actions à poser dès que le document est chargé
$(document).ready(function() {
    $("a#tableauBord").addClass("current");

    // Mettre à jour les statistiques courantes
    updateStats();

    // Action à poser lorsque l'utilisateur clique sur le bouton «Correction»
    $("a.correct").click(function() {
        // Valider la bonne ou mauvaise réponse
        var checkedRadio = $('input[name=answer]:checked');
        if (checkedRadio.val() == correctAnswer) {
            $(checkedRadio).parent().css("background-color", "lightgreen");
            
            // Ajout d'une bonne réponse dans le score
            var goodAnswers = localStorage["quiz.stat.currentTest.goodAnswers"];
            localStorage["quiz.stat.currentTest.goodAnswers"] = parseInt(goodAnswers) + 1;
        } else {
            $(checkedRadio).parent().css("background-color", "red");
            $("input[value=" + correctAnswer + "]").parent().css("background-color", "lightgreen");
        }

        // Mettre à jour les statistiques courantes
        var totalAnswers = localStorage["quiz.stat.currentTest.totalAnswers"];
        localStorage["quiz.stat.currentTest.totalAnswers"] = parseInt(totalAnswers) + 1;
        updateStats();

        $(this).text("Question suivante");
        $(this).removeClass("correct");
        $(this).addClass("next");
        $(this).unbind("click");

        $("a.next").click(function() {
            $(this).attr("href", "/question");
        });
    });
});

// Met à jour la note courante de l'utilisateur selon les données contenues dans le localStorage
function updateStats() {
    $("span#goodAnswers").text(localStorage["quiz.stat.currentTest.goodAnswers"]);
    $("span#totalAnswers").text(localStorage["quiz.stat.currentTest.totalAnswers"]);
}
