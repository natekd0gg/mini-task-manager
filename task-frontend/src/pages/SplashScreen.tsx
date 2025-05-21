import { useNavigate } from "react-router-dom";
import splashImage from "../assets/splash.png";

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-6 text-center">
      <img src={splashImage} alt="Task Manager" className="w-64 mb-8" />
      <h1 className="text-3xl font-bold mb-8">
        STAY ON TOP OF TASKS, <br />
        STRESS-FREE
      </h1>
      <button
        onClick={() => navigate("/tasks")}
        className="[background-color:#ff50be] hover:[background-color:#e647aa] font-bold py-3 px-12 rounded-full transition-colors cursor-pointer w-96"
      >
        Get started
      </button>
    </div>
  );
};

export default SplashScreen;
