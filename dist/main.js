import { fetchQuestions } from './modules/questions.js';
//beispiel aufruf um die daten zu holen
async function init() {
    let questions = await fetchQuestions();
    console.log(questions);
}
init();
