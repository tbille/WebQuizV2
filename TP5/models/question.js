var db = require('../lib/db');

var QuestionSchema = new db.Schema({
    id : {type: String, unique: true}, 
    domain : String,
    question: String,
    correctAnswer: Number,
    answers: Array
})

var MaQuestion = db.mongoose.model('ajouterQuestion', QuestionSchema);

// Exports
module.exports.ajouterQuestion = ajouterQuestion;

// Add question to database
function ajouterQuestion(id, domain, question, correctAnswer, Answers, callback) {
  var instance = new MaQuestion();
  instance.id = id;
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