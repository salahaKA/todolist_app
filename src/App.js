import React, { useEffect, useState } from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Fun to add new task
  const addTask = () => {
    if (newTask.trim()) {
      console.log("Task Added:", newTask);
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
      setError(""); 
    } else {
      setError("Task cannot be empty"); 
      console.log("No task entered");
    }
  };

  // Sorting list items
  const sortTasks = (type) => {
    let sortedTasks = [...tasks]; // Create a new array copy to avoid in-place mutation
    if (type === "alphabetical") {
      sortedTasks = sortedTasks.sort((a, b) => a.text.localeCompare(b.text));
    } else if (type === "completed") {
      sortedTasks = sortedTasks.sort((a, b) => {
        return b.completed === a.completed ? 0 : b.completed ? 1 : -1;
      });
    }
    setTasks(sortedTasks);
  };

  // delete todo
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    console.log("Task deleted:", tasks[index]);
  };

  // edit todo
  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setNewTask(taskToEdit.text);
    deleteTask(index); // Remove task from list before editing
  };

  // toggle task completion on console
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    // Filter and log completed task
    const completedTasks = updatedTasks.filter((task) => task.completed);
    console.log("Completed tasks:", completedTasks);
  };

  // function to clear/reset all tasks
  const clearTasks = () => {
    setTasks([]);
    localStorage.removeItem("tasks"); // Remove tasks from local storage
  };

  // Calculate completion percentage
  const completionPercentage = tasks.length
    ? (tasks.filter((task) => task.completed).length / tasks.length) * 100
    : 0;

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-2 rounded-2xl shadow-lg max-w-md w-full">
        <h1
          className="text-2xl p-4 font-extrabold  text-center mb-4"
          style={{
            fontSize: "30px",
            color: "#0A1F63",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          Daily To Do List
        </h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Add new list item"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className={`task-input w-full p-2 border rounded ${
              error ? "border-red-500" : ""
            }`}
          />
          <button onClick={addTask} className="add-button">
            Add
          </button>
        </div>

        {/* Display error message below the input if there's an error */}
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}

        {/* Display "Add items" if the list is empty */}
        {tasks.length === 0 && (
          <div className="text-center p-4 mt-4">
            <p className="text-gray-500 text-lg font-medium">
              <span role="img" aria-label="pointer" className="mr-2">
                📝
              </span>
              Add your first todo!
            </p>
          </div>
        )}

        {/* Task List items */}
        <ul className="space-y-2 p-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center gap-2 p-2 rounded hover:text-blue-500 transition duration-200" // Add text hover and transition classes
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

              {/* Button container to position Edit and Delete buttons */}
              <div className="flex gap-2 ml-auto">
                {/* Edit button with icon */}
                <button
                  onClick={() => editTask(index)}
                  className="edit-button p-1 text-blue-500 hover:text-blue-700 transition duration-200"
                  title="Edit task"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                {/* Delete button with icon */}
                <button
                  onClick={() => deleteTask(index)}
                  className="delete-button p-1 text-red-500 hover:text-red-700 transition duration-200"
                  title="Delete task"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <hr className="w-[80%] mx-auto my-4 border-gray-300 opacity-60" />
        {/* todo item count */}
        {tasks.length > 0 && (
          <div className="flex justify-between items-center mt-4 text-gray-400 text-sm">
            <p>{tasks.length} items</p>

            {/* Progress bar */}
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${completionPercentage}%` }}
              ></div>
              <span>{Math.round(completionPercentage)}% Completed</span>
            </div>

            {/* Sorting list items */}
            <div className="sort-container  flex items-center">
              {/* <label className="mr-2 font-bold">Sort by:</label> */}
              <FontAwesomeIcon
                icon={faSort}
                className="text-gray-600 mr-2"
                title="Sort tasks"
              />
              <select
                onChange={(e) => sortTasks(e.target.value)}
                className="sort-select"
              >
                <option value="">Select an option</option>
                <option value="alphabetical">Alphabetically</option>
                <option value="completed">By Completed</option>
              </select>
            </div>
            {/* clear all todo */}
            <button onClick={clearTasks}>Clear All</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
