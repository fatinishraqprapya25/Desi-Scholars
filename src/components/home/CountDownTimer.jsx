import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';

const TARGET_DATE = new Date('2025-07-01T09:00:00+06:00').getTime();

const TimeUnit = ({ value, label }) => {
  const formattedValue = String(value).padStart(2, '0');

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg border-2 border-white/50 transition-all duration-300 ease-in-out"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
      }}
      whileHover={{
        scale: 1.05,
        borderColor: "rgba(255, 255, 255, 0.8)",
      }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={formattedValue}
          initial={{ opacity: 0, y: 15, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="text-5xl sm:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-sky-400 tabular-nums drop-shadow-lg"
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
    setIsClient(true);
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = TARGET_DATE - now;
      setSecondsLeft(Math.max(0, Math.floor(difference / 1000)));
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(intervalId);
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
        background: `linear-gradient(145deg, #4F46E5 0%, #8B5CF6 100%)`,
      }}
    >
      {/* Decorative Blobs */}
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
          {/* Left Column */}
          <div className="flex-1 text-center xl:text-left">
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 leading-tight drop-shadow-lg"
            >
              Empowering Dreams{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-white">
                <Typewriter
                  words={["Nationally", "With Free SAT Prep", "Through College Access"]}
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
              DSAT Scholars is launching Nationally on July 1, 2025 — offering free Digital SAT prep,
              U.S. college admissions mentoring, and a supportive community to help Bangladeshi students
              unlock life-changing opportunities. No fees. No barriers. Just real impact.
            </motion.p>

            {secondsLeft > 0 && (
              <motion.div variants={itemVariants} className="text-center xl:text-left">
                <Link to="/courses"> <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 to-fuchsia-700 hover:from-purple-600 hover:to-fuchsia-800 text-white font-bold py-4 sm:py-5 px-10 sm:px-14 rounded-full text-xl sm:text-2xl tracking-wide focus:outline-none focus:ring-4 focus:ring-fuchsia-300/60 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-white/50 hover:border-white"
                >
                  Browse Our Courses
                </motion.button></Link>
                <p className="text-base text-white/80 mt-5 italic">
                  Be part of Bangladesh’s first free SAT & college access revolution.
                </p>
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <motion.h3
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center drop-shadow-lg"
            >
              Launch In:
            </motion.h3>

            <AnimatePresence mode="wait">
              {secondsLeft > 0 ? (
                <motion.div
                  key="countdown"
                  variants={contentVariants}
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
                  <h4 className="text-4xl sm:text-5xl font-bold text-green-300 mb-5 drop-shadow-lg">
                    The Journey Has Begun!
                  </h4>
                  <p className="text-xl sm:text-2xl text-white/90 mb-8">
                    Welcome to DSAT Scholars — where your dreams get the support they deserve.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-10 rounded-full transition-colors duration-300 text-xl cursor-pointer border-2 border-white/50 hover:border-white"
                  >
                    Explore Programs
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

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans relative">
      <style>{`
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

      <CountdownSection />
    </div>
  );
};

export default App;
