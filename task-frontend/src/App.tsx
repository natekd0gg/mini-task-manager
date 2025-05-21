import { Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import TaskList from "./pages/TaskList.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
