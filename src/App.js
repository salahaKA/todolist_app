import React, { useState } from "react";


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      console.log("Adding task:", newTask);
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask(""); 
    } else {
      alert("No task entered"); 
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const clearTasks = () => {
    setTasks([]);
  };
  
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2x1 font-bold text-center mb-4">
          Daily To-Do List
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add new list item"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border p-2 rounded w-full"
          ></input>

          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            ADD
          </button>
        </div>

        <ul className="space-y-2">
        {tasks.map((task, index) => (
            <li key={index} className="flex items-center gap-2">
              <input 
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
                className="form-checkbox text-green-500"
              />
              <span className={task.completed ? "line-through text-gray-500" : ""}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <button 
            onClick={clearTasks}
            className="text-sm text-red-500 mt-4 hover:underline"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
