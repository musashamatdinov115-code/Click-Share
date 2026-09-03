import {motion} from "framer-motion"
function CustomLoader() {
    const dots = [0, 1, 2, 3, 4, 5];
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="flex items-center gap-2">
        {dots.map((index) => (
          <motion.div
            key={index}
            className="w-3.5 h-3.5 rounded-full"
            style={{
              background: index < 3 ? "#8b5cf6" : "#06b6d4",
            }}
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.25, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-purple-600 font-medium text-[18px]"
      >
        Loading...
      </motion.p>
    </div>
  )
}

export default CustomLoader