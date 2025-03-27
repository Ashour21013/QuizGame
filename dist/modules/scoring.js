export class Scoring {
    constructor() {
        this.score = 0;
        this.totalQuestions = 0;
    }
    calculatePoints(difficulty, isCorrect) {
        if (isCorrect) {
            this.score += difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
        }
        this.totalQuestions++;
    }
    getScore() {
        return this.score;
    }
    getScorePercentage() {
        if (this.totalQuestions === 0)
            return 0;
        return this.totalQuestions === 0 ? 0 : (this.score / 9) * 100;
    }
}
