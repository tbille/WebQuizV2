/*

var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var Schema = mongoose.Schema;
var Utility = require('../lib/utility');

var StatsExamSchema = new Schema({
    domaines:[String],
    goodAnswers: [String],
    totalAnswers: [String]
});


StatsExamSchema.plugin(random);

var StatsExam = mongoose.model('StatsExam', StatsExamSchema);

module.exports = {
    getRandomStatsExam: function(callback) {
        StatsExam.findOneRandom(function(err, StatsExam) {
            if (err) {
                callback(err, null);
            }
            callback(err, StatsExam);
        });
    },
    getStatsExamById: function(StatsExamID, callback) {
        StatsExam.findOne( {_id: StatsExamID._id} ).exec(function(err, StatsExam) {
            if (err) {
                callback(err, null);
            }
            callback(err, StatsExam);
        });
    },
    getRandomIDs: function(domains, num, callback) {
        var filter = { domain: { $in: domains } };
        var fields = { _id: 1 };
        var options = { limit: num };
        StatsExam.findRandom(filter, fields, options, function(err, StatsExams) {
            if (err) {
                callback(err, null);
            }
            callback(err, StatsExams);
        });
    },
    addStatsExam: function(domain, StatsExam, answers, correctAnswer, callback) {
        var StatsExamModel = new StatsExam();
        StatsExamModel.domain = domain;
        StatsExamModel.StatsExam = StatsExam;
        StatsExamModel.answers = answers;
        StatsExamModel.correctAnswer = correctAnswer;

        StatsExamModel.save(function(err) {
            if (err) {
                callback(err);
            }
            callback(null, StatsExamModel);
        });
    },
    addAllStatsExams: function() {
        for (i = 0; i < StatsExams.length; i++) {
            var maStatsExam = StatsExams[i];

            var StatsExamModel = new StatsExam();
            StatsExamModel.domain = maStatsExam.domain;
            StatsExamModel.StatsExam = maStatsExam.StatsExam;
            StatsExamModel.answers = maStatsExam.answers;
            StatsExamModel.correctAnswer = maStatsExam.correctAnswer;

            StatsExamModel.save();
        }
    }
}

Array.prototype.inArray = function(value) {
    // Returns true if the passed value is found in the
    // array. Returns false if it is not.
    var i;
    for (i = 0; i < this.length; i++) {
        if (this[i] == value) {
            return true;
        }
    }
    return false;
};


*/