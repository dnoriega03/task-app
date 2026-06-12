const moods = ["😄", "😐", "😔", "😤", "😴"];

function MoodSelector({ mood, setMood }) {
  return (
    <div className="mood-box">
      <p>¿Cómo te sientes hoy?</p>

      <div className="moods">
        {moods.map((m) => (
          <span
            key={m}
            className={mood === m ? "active" : ""}
            onClick={() => setMood(m)}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

export default MoodSelector;