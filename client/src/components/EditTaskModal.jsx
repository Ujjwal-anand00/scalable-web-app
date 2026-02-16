import { useState } from "react";
import { motion } from "framer-motion";
import API from "../api/axios";
import toast from "react-hot-toast";

const EditTaskModal = ({ task, close, refresh }) => {
  const [title, setTitle] = useState(task.title);

  const updateTask = async () => {
    await API.put(`/tasks/${task._id}`, { title });
    toast.success("Task Updated!");
    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-96"
      >
        <h2 className="mb-4 font-bold dark:text-white">Edit Task</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={updateTask}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </motion.div>
    </div>
  );
};

export default EditTaskModal;
