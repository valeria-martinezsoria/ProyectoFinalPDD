import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>Gestor de Tareas</h1>
      <TaskForm onTaskAdded={() => setRefresh(!refresh)} />
      <TaskList key={refresh} />
    </div>
  );
}

export default Home;
