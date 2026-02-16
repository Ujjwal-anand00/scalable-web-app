import { motion } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle";

const Sidebar = () => {
  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-64 h-screen bg-white dark:bg-gray-900 shadow-lg p-6 fixed"
    >
      <h2 className="text-xl font-bold mb-8 dark:text-white">Dashboard</h2>

      <ul className="space-y-4 text-gray-600 dark:text-gray-300">
        <li className="hover:text-indigo-600 cursor-pointer">Home</li>
        <li className="hover:text-indigo-600 cursor-pointer">Tasks</li>
        <li className="hover:text-indigo-600 cursor-pointer">Profile</li>
      </ul>

      <div className="absolute bottom-6">
        <DarkModeToggle />
      </div>
    </motion.div>
  );
};

export default Sidebar;
