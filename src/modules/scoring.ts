export class Scoring {
  private score: number = 0;
  private totalQuestions: number = 0;

  constructor() {}

  calculatePoints(
    difficulty: 'easy' | 'medium' | 'hard',
    isCorrect: boolean,
  ): void {
    if (isCorrect) {
      this.score += difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
    }
    this.totalQuestions++;
  }

  getScore(): number {
    return this.score;
  }

  getScorePercentage(): number {
    if (this.totalQuestions === 0) return 0;

    return this.totalQuestions === 0 ? 0 : (this.score / 9) * 100;
  }
}
