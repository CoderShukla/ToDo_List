import React, { useEffect, useState } from 'react';
import Header from './componets/Header';
import ToDoList from './componets/ToDoList';

function App() {
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          isComplete: false,
        },
      ]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    ));
  };

  return (
    <div className="bg-gradient-to-b from-blue-600 to-purple-500 min-h-screen py-10 px-4 text-white">
      <div className="bg-white w-full max-w-xl mx-auto rounded-2xl shadow-2xl p-8 flex flex-col min-h-[550px] text-gray-900">
        <Header />

        {/* Input Field + Button */}
        <div className="flex items-center gap-4 my-6 bg-gray-100 rounded-full px-4 shadow-inner">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new Task"
            className="flex-1 h-12 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-500 text-base px-2"
          />
          <button
            onClick={addTask}
            className="h-12 px-6 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Add +
          </button>
        </div>

        <ToDoList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          editTask={editTask}
        />
      </div>
    </div>
  );
}

export default App;
