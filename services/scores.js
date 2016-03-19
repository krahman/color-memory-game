'use strict';
 
var BoardsService = require('./boards');
 
class ScoresService {
    constructor() {
        this.scores = new Map();
    }
 
    isBetter(newScore, oldScore, direction) {
        if (direction === 1) { // higher is better
            return (newScore > oldScore);
        } else {
            return (newScore < oldScore);
        }
    }
 
    getScores(boardId) {
        var board = BoardsService.getSingleBoard(boardId);
        if (!board || !this.scores.has(board.id)) {
            console.log('board not found! ' + boardId)
            return [];
        }
 
        let results = [];
        for (let score of this.scores.get(board.id).values()) {
            results.push(score);
        }
 
        return results.sort((a, b) => this.isBetter(b.score, a.score, board.rankDirection));
    }
 
    addScore(boardId, userId, score) {
        var board = BoardsService.getSingleBoard(boardId);
        if (!board) {
            console.log('addScore: can\'t find board: ', boardId);
            return false;
        }
 
        var scoreObj = {score: score, submitted: new Date(), userId: userId};
        if (!this.scores.has(board.id)) {
            this.scores.set(board.id, new Map());
            this.scores.get(board.id).set(userId, scoreObj);
        } else {
            if (this.scores.get(board.id).has(userId)) {
                if (this.isBetter(score, this.scores.get(board.id).get(userId).score, board.rankDirection)) {
                    this.scores.get(board.id).set(userId, scoreObj);
                }
            } else {
                this.scores.get(board.id).set(userId, scoreObj);
            }
        }
 
        return true;
    }
}
 
module.exports = new ScoresService();