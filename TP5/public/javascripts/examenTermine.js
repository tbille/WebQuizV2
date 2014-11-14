// Actions à poser dès que le document est chargé
$(document).ready(function() {
    var goodAnswers = parseInt(localStorage["quiz.stat.currentExam.goodAnswers"]);
    var totalAnswers = parseInt(localStorage["quiz.stat.currentExam.totalAnswers"]);
    $("span#goodAnswers").text(goodAnswers);
    $("span#totalAnswers").text(totalAnswers);

    saveExam(goodAnswers, totalAnswers);

    updateMessage(goodAnswers, totalAnswers);
});

/*
La fonction sauvegarde l'examen.
*/
function saveExam(goodAnswers, totalAnswers) {
    // var domains = JSON.parse(localStorage["quiz.exam.domains"]);
    var exam = {"domains": domains, goodAnswers: goodAnswers, totalAnswers: totalAnswers};
    var examsTaken = JSON.parse(localStorage["quiz.exams.taken"]);

    examsTaken.push(exam);
    localStorage["quiz.exams.taken"] = JSON.stringify(examsTaken);
}

// La fonction met à jour le message à l'utilisateur selon la note obtenue.
function updateMessage(goodAnswers, totalAnswers) {
    var result = goodAnswers / totalAnswers * 100;
    var note = goodAnswers + " / " + totalAnswers;
    var msg = "";
    if (result >= 75) {
        msg = "Félicitations! Vous avez terminé l'examen avec une note de " + note + ".";
    } else if (result >= 50) {
        msg = "Vous avez passé le test avec " + note + ". Il manque cependant un peu de pratique.";
    } else if (result >= 25) {
        msg = "Vous avez échoué le test avec " + note + ". Il manque beaucoup de pratique.";
    } else if (result >= 0) {
        msg = "Vous avez obtenu un très mauvais score de " + note + ". Aller vous exercer!";
    }
    $("p#message").text(msg);
}
