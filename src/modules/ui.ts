import { fetchQuestions, IQuestion, Question } from './questions.js';
import { Scoring } from './scoring.js';

const scoring = new Scoring();
const startQuizButton = document.getElementById('start-quiz');
const playerNameInput = document.getElementById('player-name');
const playerInputDiv = document.getElementById('player-input');
const quizDiv = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const optionsDiv = document.getElementById('options-container');
const categoryText = document.getElementById('category-text');
const difficultyText = document.getElementById('difficulty-text');
let playerName: string = '';

export async function play() {
    if (startQuizButton) {
      startQuizButton.addEventListener('click', async () => {
        let questions: Question[] = await fetchQuestions();
        if (playerNameInput instanceof HTMLInputElement && playerNameInput.value.length > 0) {
          playerName = playerNameInput.value;
          
          if (playerInputDiv) {
            playerInputDiv.style.display = 'none';
          }
  
          if (quizDiv) {
            quizDiv.style.display = 'block';
            if (questions.length > 0) {
              await displayQuestion(0, questions);
            }
          }
        } else {
          alert('Please enter your name!');
        }
      });
    }
  }

export async function displayQuestion(index: number, questions: IQuestion[]): Promise<void> {
    if (quizDiv && questionText && optionsDiv && categoryText && difficultyText && questions.length > index) {
        const currentQuestion = questions[index];

        // Kategorie und Schwierigkeit anzeigen
        categoryText.textContent = `Kategorie: ${currentQuestion.category}`;
        difficultyText.textContent = `Schwierigkeit: ${currentQuestion.difficulty}`;

        // Frage anzeigen
        questionText.textContent = currentQuestion.question;

        // Vorherige Optionen löschen
        optionsDiv.innerHTML = '';

        // Optionen erstellen und anzeigen
        currentQuestion.options.forEach((option: string | number, optionIndex: number) => {
            const optionButton = document.createElement('button');
            optionButton.textContent = String(option); // Optionstext (String oder Zahl)
            optionButton.classList.add('quiz-option', 'btn', 'btn-outline-primary', 'm-2');

            // Klick-Event für die Option
            optionButton.addEventListener('click', () => {
                if (option === currentQuestion.answer) {
                    scoring.calculatePoints(currentQuestion.difficulty, true);
                } else {
                    scoring.calculatePoints(currentQuestion.difficulty, false);
                }
                
                if (index + 1 < questions.length) {
                    displayQuestion(index + 1, questions);
                } else {
                    alert('Quiz abgeschlossen!');
                    alert(`Ergebnis: ${scoring.getScore()} Punkte (${scoring.getScorePercentage()}%)`);
                    quizDiv.style.display = 'none'; // Quiz ausblenden
                    if (playerInputDiv) {
                        playerInputDiv.style.display = 'block'; // Spieler-Input wieder anzeigen
                        if (playerNameInput instanceof HTMLInputElement) {
                            playerNameInput.value = ''; // Eingabefeld zurücksetzen
                        }
                        updateScoreboard(playerName, scoring.getScore(), scoring.getScorePercentage()); // Punktestand aktualisieren
                        scoring.resetScore(); // Punktestand zurücksetzen
                    }
                }
            });

            // Option zum Container hinzufügen
            optionsDiv.appendChild(optionButton);
        });

        // Quiz-Container sicherstellen, dass er sichtbar ist
        quizDiv.style.display = 'block';
    }
}

function updateScoreboard(playerName: string, score: number, percentage: number): void {
    const leaderboardTableBody = document.querySelector('#leaderboard-table tbody');
  
    if (leaderboardTableBody) {
      // Erstelle eine neue Zeile für das Ergebnis
      const row = document.createElement('tr');
  
      // Erstelle die Zellen für Name, Punkte und Prozent
      const nameCell = document.createElement('td');
      nameCell.textContent = playerName;
  
      const scoreCell = document.createElement('td');
      scoreCell.textContent = score.toString();
  
      const percentageCell = document.createElement('td');
      percentageCell.textContent = percentage.toFixed(2) + '%'; // Formatierte Prozentanzeige
  
      // Füge die Zellen zur Zeile hinzu
      row.appendChild(nameCell);
      row.appendChild(scoreCell);
      row.appendChild(percentageCell);
  
      // Füge die Zeile der Tabelle hinzu
      leaderboardTableBody.prepend(row);
    }
  }
  