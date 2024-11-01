import React, { useState } from "react";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); //State hold list of task
  const [newTask, setNewTask] = useState(""); //State hold new task input

  // Fun to add new task
  const addTask = () => {
    if (newTask.trim()) {
      console.log("Adding task:", newTask);
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask(""); // clear input field
    } else {
      alert("No task entered");
      console.log("tasks cannot be empty"); //log the err
    }
  };

  // Fuction to toggle task completion task on console
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    // if (!updatedTasks[index].completed) {
    //   console.log("Completed task:", updatedTasks[index]);
    // }
    // console.log("Updated tasks:", updatedTasks);

    // Filter and log completed task
    const completedTasks = updatedTasks.filter((task) => task.completed);
    console.log("Completed tasks:", completedTasks);
  };

  // function to clear/reset all tasks
  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          Daily To-Do List
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add new list item"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)} //update input state
            className="border p-2 rounded w-full"
          ></input>

          <button
            onClick={addTask} // Add task
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            ADD
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task, index) => (
            

            // Adding external css for checkbox
            <li
              key={index}
              className="flex items-center gap-2 hover:bg-blue-100 transition duration-200 p-2 rounded" // Add hover and transition classes
            >
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)} // Toggle completion on checkbox change
                />
                <span className="checkmark"></span>
              </label>
              <span
                className={task.completed ? "line-through text-gray-500" : ""}
              >
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

        <div className="mt-4 text-center">
          <p>Total Tasks: {tasks.length}</p>{" "}
          {/* Display total number of tasks */}
        </div>
      </div>
    </div>
  );
}

export default App;
