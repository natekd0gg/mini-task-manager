import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center text-white p-8">
      <div className="flex space-x-8 mb-6">
        <a href="https://vite.dev" target="_blank">
          <img
            src={viteLogo}
            className="w-16 h-16 hover:scale-110 transition-transform duration-300"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="w-16 h-16 hover:scale-110 transition-transform duration-300"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-4xl font-bold mb-4">Vite + React + Tailwind</h1>
      <div className="card bg-white text-black p-6 rounded-xl shadow-lg">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-4"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-6 text-sm italic">Click on the logos to learn more</p>
    </div>
  );
}

export default App;
