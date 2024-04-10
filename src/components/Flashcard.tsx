import { FC, useState } from "react";
import type { Flashcard } from "../App";

type Props = {
  flashcard: Flashcard;
};

const Flashcard: FC<Props> = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      {flip ? (
        <div className="back"> {flashcard.answer}</div>
      ) : (
        <div className="front">
          {flashcard.question}
          <div className="options">
            {flashcard.options.map((option) => (
              <li className="option" key={option}>
                {option}
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
