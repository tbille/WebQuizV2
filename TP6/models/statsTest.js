//Page added by GT - Résultats Tests Rapide

//creating bd collection model for test stats results
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Utility = require('../lib/utility');

var StatsTestSchema = new Schema({
    domains:[String],
    goodAnswers: Number,
    totalAnswers: Number
});

var StatsTest = mongoose.model('StatsTest', StatsTestSchema, 'StatsTest');


module.exports = {

    addStatsTest: function(domains, goodAnswers, totalAnswers, callback) {
        var StatsTestModel = new StatsTest();
        StatsTestModel.domains = domains
        StatsTestModel.goodAnswers = goodAnswers;
        StatsTestModel.totalAnswers = totalAnswers;

        StatsTestModel.save(function(err) {
            if (err) {
                callback(err);
            }
            callback(null, StatsTestModel);
        });
    },
  
  //Obtenir note moyenne cumulative tests rapides 
  getAverageStatTest: function(callback) {
      StatsTest.find(function(err, reps){
          
        if (err) {
                callback(err, null);
            }
        
        var totalGoodAnswers = 0;
        var totalOfTotalAnswers = 0;
        var testAverage = 0;
        var rep;
        //console.log("yo : " + reps[0].goodAnswers);
        for(var i=0 ; i<reps.length; i++){
          console.log( reps[i].goodAnswers );
            //testAverage += (reps[i].goodAnswers / reps[i].totalAnswers);
            totalGoodAnswers += (reps[i].goodAnswers);
            totalOfTotalAnswers += (reps[i].totalAnswers);
          }
          console.log("TotalGood test: " + totalGoodAnswers);
          console.log("TotalAnswers test: " + totalOfTotalAnswers);  
          testAverage = (totalGoodAnswers /= totalOfTotalAnswers)
          console.log("test average : " + testAverage);  
          callback(err, testAverage);
          });
    },
    
  
}
