import { fetchQuestions, Question } from './modules/questions.js';

//beispiel aufruf um die daten zu holen
async function init() {
  let questions: Question[] = await fetchQuestions();
  console.log(questions);
}

init();
