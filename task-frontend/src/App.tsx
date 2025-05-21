import { Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
