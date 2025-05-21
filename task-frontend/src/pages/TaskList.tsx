import { useEffect, useState } from "react";
import axios from "axios";
import AddTaskModal from "../components/AddTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";
import { v4 as uuidv4 } from "uuid";
import { Trash2 } from "lucide-react";

interface Task {
  id: string;
  created: Date;
  title: string;
  description: string;
  complete: boolean;
  due?: Date;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTaskModal, setAddTaskShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

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

  const handleAddTask = async (newTask: {
    title: string;
    description: string;
    due?: string;
  }) => {
    try {
      const taskToAdd: Task = {
        id: uuidv4(),
        created: new Date(),
        title: newTask.title,
        description: newTask.description,
        complete: false,
        due: newTask.due ? new Date(newTask.due) : undefined,
      };

      const response = await axios.post(
        "http://localhost:3001/tasks",
        taskToAdd
      );

      const addedTask: Task = {
        ...response.data,
        created: new Date(response.data.created),
        due: response.data.due ? new Date(response.data.due) : undefined,
      };

      setTasks([...tasks, addedTask]);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;

    try {
      await axios.delete(`http://localhost:3001/tasks/${taskToDelete.id}`);
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
      setTaskToDelete(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <>
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
                <button
                  onClick={() => handleDeleteClick(task)}
                  className="text-black hover:text-red-500 cursor-pointer transition-colors flex-shrink-0"
                  title="Delete Task"
                  data-testid={`delete-button-${task.id}`}
                >
                  <Trash2 />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setAddTaskShowModal(true)}
            className="[background-color:#ff50be] hover:bg-pink-600 text-gray-900 font-bold py-3 px-8 rounded-full transition-colors cursor-pointer"
          >
            Create New Task
          </button>
        </div>
      </div>
      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={() => setAddTaskShowModal(false)}
        onSubmit={handleAddTask}
      />
      <DeleteTaskModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteTask}
      />
    </>
  );
};

export default TaskList;
