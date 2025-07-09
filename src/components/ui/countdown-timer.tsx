import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: Date;
  title?: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = ({ 
  targetDate, 
  title = "Programs Start In", 
  className = "" 
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setIsExpired(true);
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center ${className}`}
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-full border border-green-200">
          <Clock className="w-5 h-5" />
          <span className="font-semibold">Programs Are Now Live! 🎉</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`text-center ${className}`}
    >
      <div className="inline-block">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <TimeUnit value={timeLeft.days} label="Days" />
          <Separator />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <Separator />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <Separator />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </motion.div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <motion.div 
    key={value}
    initial={{ scale: 1 }}
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 0.3 }}
    className="text-center"
  >
    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-3 sm:p-4 min-w-[60px] sm:min-w-[80px] shadow-lg">
      <div className="text-xl sm:text-2xl font-bold">
        {value.toString().padStart(2, '0')}
      </div>
    </div>
    <div className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
      {label}
    </div>
  </motion.div>
);

const Separator = () => (
  <div className="text-purple-600 text-xl sm:text-2xl font-bold animate-pulse">
    :
  </div>
);