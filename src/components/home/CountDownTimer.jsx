import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

// Define the target date outside the component to avoid re-creation on every render
// Target date: June 1, 2025, 9:00 AM (Bangladesh Standard Time, GMT+6)
const TARGET_DATE = new Date('2025-06-01T09:00:00+06:00').getTime();

// Helper component for each time unit (Days, Hours, Minutes, Seconds)
const TimeUnit = ({ value, label }) => {
  const formattedValue = String(value).padStart(2, '0');

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg border-2 border-white/50 transform transition-all duration-300 ease-in-out"
      style={{
        // Gradient background for the time unit boxes
        background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
      }}
      whileHover={{
        scale: 1.05, // Subtle hover scale
        borderColor: "rgba(255, 255, 255, 0.8)", // Brighter border on hover
      }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={formattedValue} // Crucial for re-animation on value change
          initial={{ opacity: 0, y: 15, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="text-5xl sm:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-sky-400 tabular-nums drop-shadow-lg" // Brighter, more energetic gradient
        >
          {formattedValue}
        </motion.span>
      </AnimatePresence>
      <span className="text-base sm:text-lg text-white uppercase tracking-widest mt-2 font-semibold opacity-90">
        {label}
      </span>
    </motion.div>
  );
};

const CountdownSection = () => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Component has mounted, safe to run animations

    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = TARGET_DATE - now;
      setSecondsLeft(Math.max(0, Math.floor(difference / 1000)));
    };

    calculateTimeLeft(); // Initial calculation

    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const { days, hours, minutes, seconds } = useMemo(() => {
    const d = Math.floor(secondsLeft / (24 * 60 * 60));
    const h = Math.floor((secondsLeft % (24 * 60 * 60)) / (60 * 60));
    const m = Math.floor((secondsLeft % (60 * 60)) / 60);
    const s = secondsLeft % 60;
    return { days: d, hours: h, minutes: m, seconds: s };
  }, [secondsLeft]);

  const timeUnits = useMemo(() => [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ], [days, hours, minutes, seconds]);

  // Framer Motion Variants for staggering children
  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section
      className="py-24 md:py-32 lg:py-40 relative overflow-hidden flex items-center justify-center min-h-[600px]"
      style={{
        // Deep, vibrant background gradient matching your theme
        background: `linear-gradient(145deg, #4F46E5 0%, #8B5CF6 100%)`, // Indigo to Violet
      }}
    >
      {/* Enhanced Decorative Background Elements (Blobs) for the section itself */}
      <div className="absolute -top-10 left-1/4 w-80 h-80 bg-purple-300 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob z-0"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-2000 z-0"></div>
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000 z-0"></div>


      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={isClient ? "visible" : "hidden"}
          variants={contentVariants}
          className="flex flex-col xl:flex-row items-center justify-between gap-12 md:gap-20 text-white"
        >
          {/* Left Column: Heading, Description, and Pre-Register Button */}
          <div className="flex-1 text-center xl:text-left">
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 leading-tight drop-shadow-lg" // Increased heading size
            >
              The Future of Learning{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-white">
                <Typewriter
                  words={["Is Almost Here!", "Starts with DSAT Scholars!", "Unleash Your Potential!"]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={60}
                  deleteSpeed={40}
                  delaySpeed={2500}
                />
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-white/95 mb-10 max-w-2xl mx-auto xl:mx-0 leading-relaxed drop-shadow-md"
            >
              Prepare to excel with **DSAT Scholars** in **Kurigram, Bangladesh**! Launching on **June 1st, 2025**, we offer cutting-edge courses, unparalleled resources, and a community dedicated to your success.
            </motion.p>

            {secondsLeft > 0 && (
              <motion.div
                variants={itemVariants}
                className="text-center xl:text-left"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }} // Simpler hover, no shadow
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="bg-gradient-to-r from-purple-500 to-fuchsia-700 hover:from-purple-600 hover:to-fuchsia-800 text-white font-bold py-4 sm:py-5 px-10 sm:px-14 rounded-full text-xl sm:text-2xl tracking-wide focus:outline-none focus:ring-4 focus:ring-fuchsia-300/60 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-white/50 hover:border-white" // Custom border, no box shadow, cursor pointer
                >
                  Join the Waitlist Now!
                </motion.button>
                <p className="text-base text-white/80 mt-5 italic">
                  Be among the first to access exclusive content and launch benefits.
                </p>
              </motion.div>
            )}
          </div>

          {/* Right Column: Countdown Timer */}
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <motion.h3
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center drop-shadow-lg" // Increased heading size
            >
              Launch in:
            </motion.h3>
            <AnimatePresence mode="wait">
              {secondsLeft > 0 ? (
                <motion.div
                  key="countdown"
                  variants={contentVariants} // Apply stagger to time units
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-center"
                >
                  {timeUnits.map((unit) => (
                    <TimeUnit key={unit.label} value={unit.value} label={unit.label} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="timesup"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: "circOut" }}
                  className="text-center py-12"
                >
                  <h4 className="text-4xl sm:text-5xl font-bold text-green-300 mb-5 drop-shadow-lg">The Journey Has Begun!</h4>
                  <p className="text-xl sm:text-2xl text-white/90 mb-8">
                    Welcome to DSAT Scholars! Your path to success starts now.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }} // Simpler hover, no shadow
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-10 rounded-full transition-colors duration-300 text-xl cursor-pointer border-2 border-white/50 hover:border-white" // Custom border, no box shadow, cursor pointer
                  >
                    Explore Our Programs
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main App Component (assuming this is your root component)
const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans relative">
      <style>{`
        /* Global blob animation for background elements */
        @keyframes blob {
          0% { transform: scale(1) translate(0px, 0px); }
          30% { transform: scale(1.1) translate(15px, -15px); }
          60% { transform: scale(0.9) translate(-15px, 15px); }
          100% { transform: scale(1) translate(0px, 0px); }
        }
        .animate-blob {
          animation: blob 8s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* This CountdownSection is designed to be a prominent full-width section on the page */}
      <CountdownSection />
      {/* Other sections of your website would go here */}
    </div>
  );
};

export default App;