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
    let shuffeled = shuffleArray(questions);
    return shuffeled.slice(0, 5);
}
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
