import { useEffect, useState } from "react";
import axios from "axios";
import AddTaskModal from "../components/AddTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";
import { v4 as uuidv4 } from "uuid";
import { Check, Trash2 } from "lucide-react";
import Filter from "../components/DateRangeFilter";
import Pagination from "../components/Pagination";

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
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"in-progress" | "completed">(
    "in-progress"
  );
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 20;

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

  const filteredTasks = tasks.filter((task) => {
    const createdDate = new Date(task.created);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    if (from) {
      from.setHours(0, 0, 0, 0);
      if (createdDate < from) return false;
    }

    if (to) {
      to.setHours(23, 59, 59, 999);
      if (createdDate > to) return false;
    }

    if (activeTab === "completed" && !task.complete) return false;
    if (activeTab === "in-progress" && task.complete) return false;

    return true;
  });

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

  const handleToggleTaskComplete = async (task: Task) => {
    try {
      const updatedTask = { ...task, complete: !task.complete };

      await axios.put(`http://localhost:3001/tasks/${task.id}`, updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((item) => (item.id === task.id ? updatedTask : item))
      );
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
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

  const startIndex = (currentPage - 1) * tasksPerPage;
  const paginatedTasks = filteredTasks.slice(
    startIndex,
    startIndex + tasksPerPage
  );

  return (
    <div className="max-w-3xl mx-auto text-white px-4">
      <h1 className="text-3xl font-semibold mb-8 text-gray-900 uppercase text-center">
        My Tasks
      </h1>
      <Filter
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
      />
      <div className="flex justify-center gap-8 mb-4 rounded-t-2xl bg-[#1a1a1a] px-4 py-2 w-full">
        {(["in-progress", "completed"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
            }}
            className={`relative pb-2 text-base transition-all cursor-pointer ${
              activeTab === tab
                ? "text-yellow-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-yellow-400 after:rounded"
                : "text-gray-300 hover:text-yellow-300"
            }`}
          >
            {tab === "in-progress" ? "In Progress" : "Completed"}
          </button>
        ))}
      </div>
      <div className="bg-[#1a1a1a] p-4 rounded-b-2xl">
        {paginatedTasks.length === 0 ? (
          <p className="text-center text-gray-400">
            {activeTab === "completed"
              ? "No completed tasks yet."
              : "No tasks found."}
          </p>
        ) : (
          <ul className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {paginatedTasks.map((task) => (
              <li key={task.id} className="bg-black p-4 rounded-xl shadow-md">
                <div className="flex justify-between items-start">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      task.complete ? "bg-green-600" : "bg-blue-600"
                    }`}
                  >
                    {task.complete ? "Completed" : "In Progress"}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      task.due
                        ? activeTab === "completed"
                          ? "bg-gray-500 text-white opacity-50"
                          : new Date(task.due) < new Date()
                          ? "bg-red-600 text-white"
                          : "bg-white text-black"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {task.due
                      ? `Due: ${new Date(task.due).toLocaleDateString("en-GB")}`
                      : "No due date"}
                  </span>
                </div>
                <hr className="border-t border-gray-600 my-4" />
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => handleToggleTaskComplete(task)}
                    className={`w-7 h-7 flex items-center justify-center rounded-full border-2 cursor-pointer transition-transform hover:scale-110 flex-shrink-0 ${
                      task.complete
                        ? "bg-green-400 border-green-400 text-white"
                        : "bg-white border-gray-300 text-transparent"
                    }`}
                    title={
                      task.complete ? "Mark as In Progress" : "Mark as Complete"
                    }
                  >
                    <Check size={16} />
                  </button>
                  <div className="flex-1 flex flex-col text-left ml-4">
                    <h2 className="font-bold text-lg">{task.title}</h2>
                    <p className="text-sm text-gray-300">{task.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Created:{" "}
                      {new Date(task.created).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteClick(task)}
                    className="text-white hover:text-red-500 cursor-pointer transition-colors flex-shrink-0"
                    title="Delete Task"
                    data-testid={`delete-button-${task.id}`}
                  >
                    <Trash2 />
                  </button>
                </div>
                <div className="flex justify-center mt-6">
                  <button className="w-96 bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-full transition-colors cursor-pointer">
                    Manage task
                  </button>
                </div>
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
        {filteredTasks.length > tasksPerPage && (
          <div className="mt-6">
            <Pagination
              totalItems={filteredTasks.length}
              itemsPerPage={tasksPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
