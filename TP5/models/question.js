
var db = require('../lib/db');

var QuestionSchema = new db.Schema({
    domain : String,
    question: String,
    correctAnswer: Number,
    answers: [String]
})

var MaQuestion = db.mongoose.model('Questions', QuestionSchema);

// Exports
module.exports.ajouterQuestion = ajouterQuestion;

// Add question to database
function ajouterQuestion(id, domain, question, correctAnswer, Answers, callback) {
  var instance = new MaQuestion();
  instance.domain = domain;
  instance.question = question;
  instance.correctAnswer = correctAnswer ;
  instance.answers = answers;
  instance.save(function (err) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, instance);
    }
  });
}
