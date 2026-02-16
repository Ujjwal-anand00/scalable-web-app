import { motion } from "framer-motion";

const AnalyticsCards = ({ tasks }) => {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <motion.div whileHover={{ scale: 1.05 }}
        className="bg-indigo-500 text-white p-6 rounded-xl shadow">
        <h3>Total Tasks</h3>
        <p className="text-2xl font-bold">{tasks.length}</p>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }}
        className="bg-green-500 text-white p-6 rounded-xl shadow">
        <h3>Active</h3>
        <p className="text-2xl font-bold">{tasks.length}</p>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }}
        className="bg-pink-500 text-white p-6 rounded-xl shadow">
        <h3>Completed</h3>
        <p className="text-2xl font-bold">0</p>
      </motion.div>
    </div>
  );
};

export default AnalyticsCards;
