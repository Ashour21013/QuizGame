import { fetchQuestions } from './questions.js';
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
const statisticsDiv = document.getElementById('statistics-container');
const scoreText = document.getElementById('score-text');
const percentageText = document.getElementById('percentage-text');
const questionNumberText = document.getElementById('question-number-text');
const cardBody = document.querySelector('.card-body');
const nextPlayerButton = document.getElementById('next-player-button');
const playerNameStatistic = document.getElementById('player-name-text');
let playerName = '';
let questions = [];
let currentQuestionIndex = 0;
export async function play() {
    if (startQuizButton) {
        startQuizButton.addEventListener('click', async () => {
            questions = await fetchQuestions(); // Holt die Fragen
            currentQuestionIndex = 0; // Setzt den Index zurück
            if (playerNameInput instanceof HTMLInputElement && playerNameInput.value.length > 0) {
                playerName = playerNameInput.value;
                // Verstecke die Eingabe und zeige das Quiz an
                if (playerInputDiv)
                    playerInputDiv.style.display = 'none';
                if (quizDiv)
                    quizDiv.style.display = 'block';
                // Zeige den Spielernamen an
                if (playerNameStatistic) {
                    playerNameStatistic.textContent = `Player: ${playerName}`;
                }
                // Zeige die erste Frage an
                if (questions.length > 0) {
                    await displayQuestions(currentQuestionIndex, questions);
                }
            }
            else {
                alert('Please enter your name!');
            }
        });
    }
}
async function displayQuestions(index, questions) {
    if (quizDiv && questionText && optionsDiv && categoryText && difficultyText && questions.length > index) {
        const currentQuestion = questions[index];
        quizDiv.style.display = 'block'; // Quiz-Container anzeigen
        if (cardBody instanceof HTMLElement) {
            cardBody.style.display = 'block'; // Card-Body anzeigen
        }
        // Statistiken anzeigen
        if (statisticsDiv) {
            statisticsDiv.style.display = 'block';
            if (index == 0) {
                if (scoreText) {
                    scoreText.textContent = 'Points: 0'; // Punkte zurücksetzen
                }
                if (percentageText) {
                    percentageText.textContent = 'Total Percentage: 0%'; // Prozent zurücksetzen
                }
                if (questionNumberText) {
                    questionNumberText.textContent = `Question 1 out of ${questions.length}`; // Frage 1 anzeigen
                }
            }
        }
        // Kategorie und Schwierigkeit anzeigen
        categoryText.textContent = `Kategorie: ${currentQuestion.category}`;
        difficultyText.textContent = `Schwierigkeit: ${currentQuestion.difficulty}`;
        // Frage anzeigen
        questionText.textContent = currentQuestion.question;
        // Vorherige Optionen löschen
        optionsDiv.innerHTML = '';
        // Optionen erstellen und anzeigen
        currentQuestion.options.forEach((option) => {
            const optionButton = document.createElement('button');
            optionButton.textContent = String(option); // Optionstext (String oder Zahl)
            // Klick-Event für die Option
            optionButton.addEventListener('click', () => {
                // Punktestand berechnen
                if (option === currentQuestion.answer) {
                    scoring.calculatePoints(currentQuestion.difficulty, true);
                }
                else {
                    scoring.calculatePoints(currentQuestion.difficulty, false);
                }
                if (scoreText && percentageText) {
                    scoreText.textContent = `Points: ${scoring.getScore()}`;
                    percentageText.textContent = `Total Percentage: ${scoring.getScorePercentage().toFixed(2)}%`;
                }
                // Nächste Frage oder Ende des Quiz
                if (index + 1 < questions.length) {
                    currentQuestionIndex = index + 1;
                    displayQuestions(currentQuestionIndex, questions);
                    if (questionNumberText) {
                        questionNumberText.textContent = `Question ${index + 2} out of ${questions.length}`;
                    }
                }
                else {
                    endQuiz();
                }
            });
            // Option zum Container hinzufügen
            optionsDiv.appendChild(optionButton);
        });
        quizDiv.style.display = 'block';
    }
}
function endQuiz() {
    if (cardBody instanceof HTMLElement) {
        cardBody.style.display = 'none'; // Quiz ausblenden
    }
    if (statisticsDiv) {
        statisticsDiv.style.display = 'block'; // Statistiken anzeigen
    }
    if (nextPlayerButton) {
        nextPlayerButton.style.display = 'block'; // Nächster Spieler-Button anzeigen
        nextPlayerButton.addEventListener('click', resetQuizState); // Reset für den nächsten Spieler
    }
}
function resetQuizState() {
    // Verstecke alle relevanten Elemente
    if (quizDiv)
        quizDiv.style.display = 'none';
    if (statisticsDiv)
        statisticsDiv.style.display = 'none';
    if (nextPlayerButton)
        nextPlayerButton.style.display = 'none';
    if (playerInputDiv)
        playerInputDiv.style.display = 'block';
    // Setze Texte und Inhalte zurück
    if (questionText)
        questionText.textContent = '';
    if (optionsDiv)
        optionsDiv.innerHTML = '';
    if (categoryText)
        categoryText.textContent = '';
    if (difficultyText)
        difficultyText.textContent = '';
    if (scoreText)
        scoreText.textContent = 'Points: 0';
    if (percentageText)
        percentageText.textContent = 'Total Percentage: 0%';
    if (questionNumberText)
        questionNumberText.textContent = '';
    // Spielername zurücksetzen
    if (playerNameInput instanceof HTMLInputElement) {
        playerNameInput.value = '';
    }
    // Leaderboard aktualisieren
    updateScoreboard(playerName, scoring.getScore(), scoring.getScorePercentage());
    // Scoring zurücksetzen
    scoring.resetScore();
}
function updateScoreboard(playerName, score, percentage) {
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
        // Füge die Zeile der Tabelle hinzu (an den Anfang der Tabelle)
        leaderboardTableBody.prepend(row);
    }
}
