import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MoodSelector from "./components/MoodSelector";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import "./App.css";

function App() {
  // 🔥 BANCO DE FRASES
  const messages = {
    "😄": [
      "Hoy estás brillando ✨",
      "Esa energía tuya contagia 💛",
      "Disfruta este momento, te lo mereces 🌈",
      "Sigue así, estás en tu mejor vibra 🔥",
      "Tu alegría también es disciplina 💫",
    ],
    "😐": [
      "Paso a paso, sin presión 🌱",
      "No todo tiene que ser perfecto hoy",
      "Avanzar lento también es avanzar 🐢",
      "Respira, sigue… lo estás haciendo bien",
      "Un día tranquilo también suma 🤍",
    ],
    "😔": [
      "Todo está bien, sigue 💖",
      "Está bien no estar bien a veces",
      "Dios sigue contigo incluso en días grises 🙏",
      "Esto también va a pasar 🌧️",
      "Sé suave contigo hoy 🤍",
    ],
    "😤": [
      "Canaliza esa energía 🔥",
      "Usa esa rabia para avanzar, no para rendirte",
      "Tienes más control del que crees 💪",
      "Respira… y enfoca esa fuerza",
      "Transforma eso en disciplina ⚡",
    ],
    "😴": [
      "Descansar también es avanzar 😌",
      "Tu cuerpo también necesita pausas",
      "Recargar energía es parte del proceso 🔋",
      "Mañana será otro día para intentarlo 🌙",
      "No te exijas tanto hoy 🤍",
    ],
  };

  // 🌙 DARK MODE
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 😊 MOOD
  const [mood, setMood] = useState(() => {
    return localStorage.getItem("mood") || "😄";
  });

  // 💬 FRASE ACTUAL
  const [message, setMessage] = useState("");

  // 📋 HÁBITOS
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("dailyflow-habits");
    return saved ? JSON.parse(saved) : [];
  });

  // 🎲 FUNCIÓN FRASE ALEATORIA
  const getRandomMessage = (mood, currentMessage) => {
    const moodMessages = messages[mood];
    if (!moodMessages) return "";

    let newMessage;
    do {
      newMessage =
        moodMessages[Math.floor(Math.random() * moodMessages.length)];
    } while (newMessage === currentMessage);

    return newMessage;
  };

  // 💾 GUARDADOS
  useEffect(() => {
    localStorage.setItem("dailyflow-habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem("mood", mood);
  }, [mood]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ✨ CAMBIAR FRASE CUANDO CAMBIA EL MOOD
  useEffect(() => {
    setMessage((prev) => getRandomMessage(mood, prev));
  }, [mood]);

  // ➕ AGREGAR HÁBITO
  const addHabit = (name) => {
    const newHabit = {
      id: Date.now(),
      name,
      streak: 0,
      completedDates: [],
    };
    setHabits((prev) => [newHabit, ...prev]);
  };

  // ✅ TOGGLE
  const toggleHabit = (id) => {
    const today = new Date().toLocaleDateString();

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const exists = h.completedDates.includes(today);

          return {
            ...h,
            completedDates: exists
              ? h.completedDates.filter((d) => d !== today)
              : [...h.completedDates, today],
            streak: exists ? h.streak - 1 : h.streak + 1,
          };
        }
        return h;
      })
    );
  };

  // 🗑️ DELETE
  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  // ✏️ EDIT
  const editHabit = (id, newName) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, name: newName } : h))
    );
  };

  return (
    <motion.div className="app">
      <div className="container">
        {/* HEADER */}
        <header className="header">
          <div>
            <h1 className="title">🌿 Daily Flow</h1>

            <motion.p
              key={message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="message"
            >
              {message}
            </motion.p>

            <button
              className="new-message"
              onClick={() => setMessage((prev) => getRandomMessage(mood, prev))}
            >
              otra ✨
            </button>
          </div>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </header>

        {/* MOOD */}
        <MoodSelector mood={mood} setMood={setMood} />

        {/* SUMMARY */}
        <section className="summary">
          <p>
            Hoy llevas{" "}
            {
              habits.filter((h) =>
                h.completedDates.includes(new Date().toLocaleDateString())
              ).length
            }{" "}
            hábitos ✨
          </p>
        </section>

        {/* FORM */}
        <HabitForm addHabit={addHabit} />

        {/* LISTA */}
        <HabitList
          habits={habits}
          toggleHabit={toggleHabit}
          deleteHabit={deleteHabit}
          editHabit={editHabit}
        />
      </div>
    </motion.div>
  );
}

export default App;
