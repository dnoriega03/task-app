import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

function HabitCard({ habit, toggleHabit, deleteHabit, editHabit }) {
  const today = new Date().toLocaleDateString();
  const doneToday = habit.completedDates.includes(today);

  // 📊 progreso semanal (mejor UX)
  const progress = Math.min(
    (habit.completedDates.length / 7) * 100,
    100
  );

  const handleEdit = () => {
    const newName = prompt("Editar hábito:", habit.name);
    if (newName && newName.trim()) {
      editHabit(habit.id, newName);
    }
  };

  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <h3>{habit.name}</h3>

      <p>🔥 {habit.streak} días</p>

      {/* 📊 PROGRESO */}
      <div className="progress-wrapper">
        <div className="progress-text">
          <span>Progreso</span>
          <span>{Math.round(progress)}%</span>
        </div>

        <div className="progress">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* BOTÓN PRINCIPAL */}
      <button
        className={doneToday ? "done" : ""}
        onClick={() => toggleHabit(habit.id)}
      >
        {doneToday ? "✔ Hecho hoy" : "Marcar hoy"}
      </button>

      {/* ACCIONES */}
      <div className="actions">
        <button className="icon-btn edit" onClick={handleEdit}>
          <Pencil size={18} />
        </button>

        <button
          className="icon-btn delete"
          onClick={() => deleteHabit(habit.id)}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}

export default HabitCard;
