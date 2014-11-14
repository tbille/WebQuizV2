var db = require('../lib/db');

var QuestionSchema = new db.Schema({
    id : {type: String, unique: true},
    domain : String,
    question: String,
    correctAnswer: String,
    answers: String
})

var MyQuestion = db.mongoose.model('Question', QuestionSchema);

// Exports
module.exports.ajouterQuestion = ajouterQuestion;

// Add user to database
function ajouterQuestion(question, correctAnswer, callback) {
  var instance = new MyUser();
  instance.username = username;
  instance.password = password;
  instance.save(function (err) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, instance);
    }
  });
}