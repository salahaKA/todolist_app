import React, { useEffect, useState } from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

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
    } else {
      alert("No task entered");
      console.log("tasks cannot be empty");
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
    // console.log("Editing task:", taskToEdit);
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

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
        
        {/* <h1 className="text-2xl font-extrabold text-blue-950 text-center mb-4">
          Daily To Do List
        </h1> */}

        <h1
          className="text-2xl font-extrabold  text-center mb-4"
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
            className="task-input w-full p-2 border rounded"
          />
          <button onClick={addTask} className="add-button">
            Add
          </button>
        </div>

        {/* Task List items */}
        <ul className="space-y-2">
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

        <hr></hr>
        {/* todo item count */}
        {tasks.length > 0 && (
          <div className="flex justify-between items-center mt-4 text-gray-400 text-sm">
            <p>{tasks.length} items</p>

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

            <button onClick={clearTasks} className="hover:underline">
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
