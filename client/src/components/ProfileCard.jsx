import { motion } from "framer-motion";

const ProfileCard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
    >
      <h3 className="text-lg font-bold mb-2 dark:text-white">Profile</h3>
      <p className="dark:text-gray-300">Name: {user?.name}</p>
      <p className="dark:text-gray-300">Email: {user?.email}</p>
    </motion.div>
  );
};

export default ProfileCard;
