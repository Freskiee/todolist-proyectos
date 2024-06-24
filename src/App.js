import { useEffect, useState } from 'react';
import 'fomantic-ui-css/semantic.min.css';
import Container from './components/Container';
import Header from './components/Header';
import InputTask from './components/InputTask';
import TaskContent from './components/TaskContent';

function App() {
  // Inicializar initialTasks como un array vacío
  let initialTasks = [];

  // Intentar parsear el valor del localStorage
  try {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      initialTasks = JSON.parse(storedTasks);
    }
  } catch (e) {
    console.error('Error parsing JSON from localStorage:', e);
  }

  const [tasks, setTasks] = useState(initialTasks);

  // Guardar tareas en el localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    const currentTask = tasks.filter((task) => task.idTask !== id)
    setTasks(currentTask);
  }

  return (
    <Container>
      <Header />
      <InputTask createTask={createTask} />
      <TaskContent tasks={tasks} deleteTask={deleteTask} />
    </Container>
  );
}

export default App;
