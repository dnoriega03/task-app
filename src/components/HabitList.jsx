import HabitCard from "./HabitCard";

function HabitList({ habits, toggleHabit, deleteHabit, editHabit }) {
  return (
    <div className="grid">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          toggleHabit={toggleHabit}
          deleteHabit={deleteHabit}
          editHabit={editHabit}
        />
      ))}
    </div>
  );
}

export default HabitList;
