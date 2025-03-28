import { displayQuestion } from "./modules/ui.js";
import { fetchQuestions, Question } from "./modules/questions.js";

async function play() {
  let questions: Question[] = await fetchQuestions();
  console.log(questions);

  const startQuizButton = document.getElementById('start-quiz');
  const playerNameInput = document.getElementById('player-name');
  const playerInputDiv = document.getElementById('player-input');
  const quizDiv = document.getElementById('quiz-container');
  let playerName: string = '';
  if (startQuizButton) {
      startQuizButton.addEventListener('click', () => {
          if (playerNameInput instanceof HTMLInputElement && playerNameInput.value.length > 0) {
          playerName = playerNameInput.value;
          if (playerInputDiv) {
              playerInputDiv.style.display = 'none';
          }
          if (quizDiv) {
              quizDiv.style.display = 'block';
              if(questions.length > 0) {
                displayQuestion(0, questions);
                if (playerInputDiv) {
                  playerInputDiv.style.display = 'block';
                }
                if (quizDiv) {
                  quizDiv.style.display = 'block';
                }
              }
          }
          } else {
          alert('Please enter your name!');
          }
      });
  }
}

while(1)
{
  play();
}

