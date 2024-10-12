import { motion } from "framer-motion";
import { ChevronRight, BarChart2, Users, Clock, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LogoBar } from "../components/shared/LogoBar";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg"
  >
    <Icon className="w-12 h-12 text-emerald-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-white">
      {title}
    </h3>
    <p className="text-zinc-600 dark:text-zinc-300">{description}</p>
  </motion.div>
);

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen `}>
      <div className="bg-zinc-50 dark:bg-zinc-900 min-h-screen transition-colors duration-300">
        <nav className="bg-white dark:bg-zinc-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
              <LogoBar/>
              </div>
              <div className="flex items-center">
                <button
                  // onClick={toggleDarkMode}
                  className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  {/* {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />} */}
                </button>
                <button
                  onClick={() => navigate("/auth")}
                  className="ml-4 px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 transition-colors duration-300"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-6xl font-extrabold text-zinc-900 dark:text-white mb-4"
            >
              Track your work seamlessly
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-4xl font-bold text-emerald-500 mb-8 capitalize tracking-tighter"
            >
              work forward.
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-zinc-600 dark:text-zinc-300 mb-12 max-w-2xl mx-auto"
            >
              Prioritize your time. Collaborate and Manage seamlessly, reaching
              new heights of productivity. Save your work with WorkTracker.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/auth")}
              className="px-8 py-4 bg-emerald-500 text-white rounded-full text-xl font-semibold hover:bg-emerald-600 transition-colors duration-300 flex items-center mx-auto"
            >
              Get Started
              <ChevronRight className="ml-2 w-6 h-6" />
            </motion.button>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={BarChart2}
              title="Advanced Analytics"
              description="Gain insights into your work patterns and team performance with our powerful analytics tools."
            />
            <FeatureCard
              icon={Users}
              title="Seamless Collaboration"
              description="Work together effortlessly with real-time updates and intuitive sharing features."
            />
            <FeatureCard
              icon={Clock}
              title="Time Management"
              description="Optimize your productivity with our intelligent time tracking and task prioritization system."
            />
          </div>
        </main>

        <footer className="bg-zinc-100 dark:bg-zinc-800  py-6 border-t border-zinc-200 dark:border-zinc-700 pt-8 text-center">
          <p className="text-zinc-500 dark:text-zinc-400">
            &copy; 2024 WorkTracker. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
