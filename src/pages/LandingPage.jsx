import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Clock, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-12 h-12 text-emerald-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-zinc-100">{title}</h3>
    <p className="text-zinc-400">{description}</p>
  </motion.div>
);

const GlowingButton = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className="relative px-6 py-3 bg-emerald-500 text-black font-medium rounded-full overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-white mix-blend-soft-light"
        animate={{
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

const BackgroundGradient = () => (
  <div
    className="absolute inset-0 max-w-md mx-auto h-[27rem] blur-[118px] sm:h-[40rem] opacity-20"
    style={{
      background:
        "linear-gradient(152.92deg, rgba(16, 185, 129, 0.2) 4.54%, rgba(16, 185, 129, 0.1) 34.2%, rgba(16, 185, 129, 0.05) 77.55%)",
    }}
  ></div>
);

const TextGradient = ({ children }) => (
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-200">
    {children}
  </span>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 overflow-hidden">
      <BackgroundGradient />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold tracking-tight">
            <TextGradient>WorkTracker</TextGradient>
          </div>
        </nav>

        <main>
          <div className="text-center mb-16">
            <motion.h1
              className="text-5xl sm:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Track your work <TextGradient>seamlessly</TextGradient>
            </motion.h1>
            <motion.p
              className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Prioritize your time. Collaborate and Manage seamlessly, reaching
              new heights of productivity. Save your work with WorkTracker.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/boards">
                <GlowingButton>
                  Get Started <ArrowRight className="inline-block ml-2" />
                </GlowingButton>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
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
          </motion.div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Trusted by My Teammates for now.
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold mb-4">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Sign Up",
                  description: "Create your account in seconds",
                },
                {
                  title: "Set Up Projects",
                  description: "Organize your work into projects and tasks",
                },
                {
                  title: "Start Tracking",
                  description:
                    "Track time, collaborate, and boost productivity",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <div className="bg-emerald-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-zinc-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to boost your productivity?
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have already transformed their
              work with WorkTracker.
            </p>
            <Link to="/boards">
              <GlowingButton>
                Start Free Trial <ArrowRight className="inline-block ml-2" />
              </GlowingButton>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
