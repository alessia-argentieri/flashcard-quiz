import { FC, useState, useEffect } from "react";
import FlashcardList from "./components/FlashcardList";
import Form from "./components/Form";

export type Flashcard = {
  id: number;
  question: string;
  answer: string;
  options: string[];
};

type ApiFlashcard = {
  id: number;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type Response = {
  results: ApiFlashcard[];
};

const App: FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [submitted, setSubmitted] = useState(9);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=12&category=${submitted}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response error`);
        }
        return response.json();
      })
      .then((data: Response) => {
        setFlashcards(
          data.results.map((result, index) => {
            const options = [
              ...result.incorrect_answers.map((answ) => unescape(answ)),
              result.correct_answer,
            ];
            return {
              id: index,
              question: unescape(result.question),
              answer: unescape(result.correct_answer),
              options: options.toSorted(() => Math.random() - 0.5),
            };
          })
        );
      })
      .catch((error) => console.log(`Error ${error}`));
  }, [submitted]);

  const unescape = (str: string) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  };

  return (
    <div>
      <Form onSubmit={setSubmitted} />
      <FlashcardList flashcards={flashcards} />
    </div>
  );
};

export default App;
