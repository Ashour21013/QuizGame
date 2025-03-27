export class Question {
    constructor(category, question, options, answer, difficulty) {
        this.category = category;
        this.question = question;
        this.options = options;
        this.answer = answer;
        this.difficulty = difficulty;
    }
}
export async function fetchQuestions() {
    const response = await fetch('./../../questions.json');
    const data = await response.json();
    let questions = data.map((questions) => new Question(questions.category, questions.question, questions.options, questions.answer, questions.difficulty));
    let easy = questions.filter((q) => q.difficulty === 'easy');
    let medium = questions.filter((q) => q.difficulty === 'medium');
    let hard = questions.filter((q) => q.difficulty === 'hard');
    return [
        ...shuffleArray(easy).slice(0, 2),
        ...shuffleArray(medium).slice(0, 2),
        ...shuffleArray(hard).slice(0, 1),
    ];
}
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
