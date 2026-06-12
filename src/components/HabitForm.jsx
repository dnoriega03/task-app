import { useState } from "react";

function HabitForm({ addHabit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    addHabit(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Nuevo hábito..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button>Agregar</button>
    </form>
  );
}

export default HabitForm;