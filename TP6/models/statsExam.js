//Page added by GT - Résultats Examens

//creating bd collection model for exam stat results
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Utility = require('../lib/utility');

var StatsExamSchema = new Schema({
    domains:[String],
    goodAnswers: Number,
    totalAnswers: Number
});

var StatsExam = mongoose.model('StatsExam', StatsExamSchema, 'StatsExam');


module.exports = {
    addStatsExam: function(domains, goodAnswers, totalAnswers, callback) {
        var StatsExamModel = new StatsExam();
        StatsExamModel.domains = domains
        StatsExamModel.goodAnswers = goodAnswers;
        StatsExamModel.totalAnswers = totalAnswers;

        StatsExamModel.save(function(err) {
            if (err) {
                callback(err);
            }
            callback(null, StatsExamModel);
        });
    },
  
  //Obtenir note moyenne cumulative Examens 
  getAverageStatExam: function(callback) {
      StatsExam.find(function(err, reps){
          
        if (err) {
                callback(err, null);
        }
        else{
          var totalGoodAnswers = 0;
          var totalOfTotalAnswers = 0;
          var examAverage = 0;
          var rep;
          for(var i=0 ; i<reps.length; i++){
            //console.log( reps[i].goodAnswers );
              //examAverage += (reps[i].goodAnswers / reps[i].totalAnswers);
              totalGoodAnswers += (reps[i].goodAnswers);
              totalOfTotalAnswers += (reps[i].totalAnswers);
            }

            console.log("TotalGood Exam: " + totalGoodAnswers);
            console.log("TotalAnswers Exam: " + totalOfTotalAnswers);
            //console.log("nombre de document: " + StatsExam.count(callback))
            examAverage = (totalGoodAnswers /= totalOfTotalAnswers) * 100
            console.log("Exam average : " + parseInt(examAverage));  
            callback(err, parseInt(examAverage));
        }
      });
    },
  
  
//  Obtenir liste des notes Examen
  getListStatExam: function(callback) {
      StatsExam.find(function(err, reps){
          
        if (err) {
                callback(err, null);
        }else{

          callback(err, reps);
        }
        });
    },
  
  razBase: function(callback){
    StatsExam.remove({}, function(err) { 
      console.log('collection removed') 
    });  
  }
  
}
