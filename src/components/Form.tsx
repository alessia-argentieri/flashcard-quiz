import { FC, useState, useEffect, FormEventHandler } from "react";

type Category = {
  id: number;
  name: string;
};

type Response = {
  trivia_categories: Category[];
};

type Props = {
  onSubmit: (catId: number) => void;
};

const Form: FC<Props> = ({ onSubmit }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState(9);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response error`);
        }
        return response.json();
      })
      .then((data: Response) => {
        setCategories(data.trivia_categories);
      })
      .catch((error) => console.log(`Error ${error}`));
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(selected);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="header">Flashcard Quiz</h1>
      <label className="form-label">Select a category:</label>
      <select
        className="select-menu"
        onChange={(e) => setSelected(Number(e.target.value))}
        id="category"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button className="btn">Get questions</button>
    </form>
  );
};

export default Form;
