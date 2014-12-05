// Page added by GT - creating model for test stat results

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Utility = require('../lib/utility');

var statsTestSchema = new Schema({
    domaines:[String],
    goodAnswers: Number,
    totalAnswers: Number
});

var statsTest = mongoose.model('statsTest', statsTestSchema);

module.exports = {

    addstatsTest: function(domaines, goodAnswers, totalAnswers, callback) {
        var statsTestModel = new statsTest();
        statsTestModel.domaines = domains;
        statsTestModel.goodAnswers = goodAnswers;
        statsTestModel.totalAnswers = totalAnswers;

        statsTestModel.save(function(err) {
            if (err) {
                callback(err);
            }
            callback(null, statsTestModel);
        });
    },
}