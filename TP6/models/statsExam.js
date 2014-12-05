//Page added by GT - creating model for exam stat results
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Utility = require('../lib/utility');

var StatsExamSchema = new Schema({
    domaines:[String],
    goodAnswers: Number,
    totalAnswers: Number
});

var StatsExam = mongoose.model('StatsExam', StatsExamSchema);


module.exports = {

    addStatsExam: function(domaines, goodAnswers, totalAnswers, callback) {
        var StatsExamModel = new StatsExam();
        StatsExamModel.domaines = domains
        StatsExamModel.goodAnswers = goodAnswers;
        StatsExamModel.totalAnswers = totalAnswers;

        StatsExamModel.save(function(err) {
            if (err) {
                callback(err);
            }
            callback(null, StatsExamModel);
        });
    },
  
}
