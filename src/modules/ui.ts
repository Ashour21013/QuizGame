import { IQuestion } from './questions.js';
import { Scoring } from './scoring.js';

const scoring = new Scoring();

export function displayQuestion(index: number, questions: IQuestion[]): void {
    const quizDiv = document.getElementById('quiz-container');
    const questionText = document.getElementById('question-text');
    const optionsDiv = document.getElementById('options-container');
    const categoryText = document.getElementById('category-text');
    const difficultyText = document.getElementById('difficulty-text');

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
                }
            });

            // Option zum Container hinzufügen
            optionsDiv.appendChild(optionButton);
        });

        // Quiz-Container sicherstellen, dass er sichtbar ist
        quizDiv.style.display = 'block';
    }
}
