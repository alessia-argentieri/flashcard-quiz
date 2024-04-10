import { FC, useState } from "react";
import FlashcardList from "./components/FlashcardList";

export type Flashcard = {
  id: number;
  question: string;
  answer: string;
  options: string[];
};

const App: FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  return (
    <div>
      <FlashcardList flashcards={flashcards} />
    </div>
  );
};

export default App;
