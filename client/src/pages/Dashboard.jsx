import { useEffect, useState, useContext } from "react";
import {
  Moon,
  Sun,
  LogOut,
  Menu,
  X,
  Home,
  ListTodo,
  User
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";


const SortableItem = ({ task, toggleComplete, deleteTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center"
    >
      <span
        className={`${
          task.completed
            ? "line-through text-gray-400"
            : "dark:text-white"
        }`}
      >
        {task.title}
      </span>

      <div className="flex gap-4">
        <button
          onClick={() => toggleComplete(task)}
          className="text-green-500 hover:text-green-700"
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={() => deleteTask(task._id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};


const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  
  let user = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined") {
      user = JSON.parse(stored);
    }
  } catch {}


  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  /* Fetch tasks */
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* Add task */
  const addTask = async () => {
    if (!title) return;

    await API.post("/tasks", {
      title,
      completed: false,
      order: tasks.length
    });

    toast.success("Task Added");
    setTitle("");
    fetchTasks();
  };

  /* Delete */
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    toast.success("Deleted");
    fetchTasks();
  };

  /* Toggle */
  const toggleComplete = async (task) => {
    await API.put(`/tasks/${task._id}`, {
      ...task,
      completed: !task.completed
    });
    fetchTasks();
  };

  /* Drag */
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex(t => t._id === active.id);
    const newIndex = tasks.findIndex(t => t._id === over.id);

    const newTasks = arrayMove(tasks, oldIndex, newIndex);
    setTasks(newTasks);

    await Promise.all(
      newTasks.map((task, index) =>
        API.put(`/tasks/${task._id}`, { ...task, order: index })
      )
    );
  };

  /* Logout */
  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/login");
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Toaster position="top-right" />

      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">

        <div className="w-64 hidden md:flex flex-col bg-white dark:bg-gray-900 shadow-lg p-6 justify-between">

          <div>
            <h2 className="text-2xl font-bold mb-10 dark:text-white">
              Dashboard
            </h2>

            <nav className="space-y-3">
              <button
                onClick={() => setActiveTab("home")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                  activeTab === "home"
                    ? "bg-indigo-500 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <Home size={18} /> Home
              </button>

              <button
                onClick={() => setActiveTab("tasks")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                  activeTab === "tasks"
                    ? "bg-indigo-500 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <ListTodo size={18} /> Tasks
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                  activeTab === "profile"
                    ? "bg-indigo-500 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <User size={18} /> Profile
              </button>
            </nav>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center gap-2 w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-800"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
              Toggle Theme
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full p-3 rounded-lg bg-red-500 text-white"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>


        <div className="flex-1 p-8">


          {activeTab === "home" && (
            <>
              <h1 className="text-3xl font-bold mb-6 dark:text-white">
                Welcome, {user?.name || "User"} 
              </h1>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-indigo-500 text-white p-6 rounded-xl">
                  Total Tasks
                  <p className="text-2xl font-bold">{tasks.length}</p>
                </div>

                <div className="bg-green-500 text-white p-6 rounded-xl">
                  Completed
                  <p className="text-2xl font-bold">
                    {tasks.filter(t => t.completed).length}
                  </p>
                </div>

                <div className="bg-pink-500 text-white p-6 rounded-xl">
                  Pending
                  <p className="text-2xl font-bold">
                    {tasks.filter(t => !t.completed).length}
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === "tasks" && (
            <>
              <div className="flex gap-3 mb-6">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add new task"
                  className="flex-1 p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={addTask}
                  className="bg-indigo-600 text-white px-6 rounded-lg"
                >
                  Add
                </button>
              </div>

              <input
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 border rounded-lg mb-6 dark:bg-gray-800 dark:text-white"
              />

              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext
                  items={tasks.map(t => t._id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {filteredTasks.map(task => (
                      <SortableItem
                        key={task._id}
                        task={task}
                        toggleComplete={toggleComplete}
                        deleteTask={deleteTask}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </>
          )}

          {activeTab === "profile" && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-md">
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Profile Info
              </h2>
              <p className="dark:text-gray-300">Name: {user?.name}</p>
              <p className="dark:text-gray-300">Email: {user?.email}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
