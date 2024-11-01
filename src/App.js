import React from "react";
// import './index.css';

function App() {
  
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
            className="border p-2 rounded w-full"
          ></input>

          <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">ADD</button>
        </div>

      </div>
    </div>
  );
}

export default App;
