import { useEffect, useState } from "react";
import axios from "axios";

type Task = {
  id: string;
  created: Date;
  title: string;
  description: string;
  complete: boolean;
  due?: Date;
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>("http://localhost:3001/tasks");
        const tasks = response.data.map((task) => ({
          ...task,
          created: new Date(task.created),
          due: task.due ? new Date(task.due) : undefined,
        }));
        setTasks(tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`p-4 rounded-lg shadow-sm border ${
                task.complete ? "bg-green-100" : "bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-sm text-gray-500">
                Created: {task.created.toLocaleDateString()}
              </p>
              {task.due && (
                <p className="text-sm text-red-600">
                  Due: {task.due.toLocaleDateString()}
                </p>
              )}
              <p
                className={`text-sm font-medium ${
                  task.complete ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {task.complete ? "Completed" : "Incomplete"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
