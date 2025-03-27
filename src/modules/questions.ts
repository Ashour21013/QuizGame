export interface IQuestion {
  category: string;
  question: string;
  options: (string | number)[];
  answer: string | number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export class Question implements IQuestion {
  category: string;
  question: string;
  options: (string | number)[];
  answer: string | number;
  difficulty: 'easy' | 'medium' | 'hard';

  constructor(
    category: string,
    question: string,
    options: (string | number)[],
    answer: string | number,
    difficulty: 'easy' | 'medium' | 'hard',
  ) {
    this.category = category;
    this.question = question;
    this.options = options;
    this.answer = answer;
    this.difficulty = difficulty;
  }
}

export async function fetchQuestions(): Promise<Question[]> {
  const response = await fetch('./../../questions.json');
  const data = await response.json();

  let questions: Question[] = data.map(
    (questions: any) =>
      new Question(
        questions.category,
        questions.question,
        questions.options,
        questions.answer,
        questions.difficulty,
      ),
  );

  return questions;
}
