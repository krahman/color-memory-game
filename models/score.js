var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
    username: {type: String, required: true},
    score: {type: Number, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

ScoreSchema.pre('save', function (next) {
    var now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }

    next();
});

ScoreSchema.index({location: '2dsphere'});

module.exports = mongoose.model('score', ScoreSchema);