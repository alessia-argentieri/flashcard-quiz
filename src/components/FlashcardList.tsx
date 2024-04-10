import { FC } from "react";
import FlashcardC from "./Flashcard";
import { Flashcard } from "../App";

type Props = {
  flashcards: Flashcard[];
};

const FlashcardList: FC<Props> = ({ flashcards }) => {
  return (
    <div className="card-grid">
      {flashcards.map((flashcard) => (
        <FlashcardC flashcard={flashcard} key={flashcard.id} />
      ))}
    </div>
  );
};

export default FlashcardList;
