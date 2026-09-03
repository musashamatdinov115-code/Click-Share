import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import CustomLoader from "@/features/customLoader/CustomLoader";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200)

    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/products')
  }
  return (
    
    <div className="flex gap-[5px] relative h-[740px] items-center justify-center">
      {isLoading ? (
        <CustomLoader/>
      ) : (
      <div className="p-[7px] h-full w-full relative  overflow-hidden max-w-[2000px] mx-auto flex justify-center items-center flex-col gap-3">
        <div className="flex relative z-[1] flex-col justify-center items-center gap-3">
          <motion.h2 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{  delay: 0.1, type: "spring", stiffness: 100, damping: 13 }} className=" text-[30px] md:text-[40px] lg:text-[45px] font-bold leading-[36px] md:leading-[50px] lg:leading-[55px] text-center mx-[5%] text-indigo-700 drop-shadow-md max-w-[1000px]">Find life-easing technologies only at Click Shop!</motion.h2>
          <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{  delay: 0.3, type: "spring", stiffness: 100, damping: 13 }} className=" text-gray-600 font-medium text-center max-w-[700px] mx-[5%] text-[12px] md:text-[14px]">We have the latest smartphones, modern laptops, computers, and various accessories. Only with us you can buy quality technology at affordable prices!</motion.p>
          <motion.button initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{  delay: 0.4, type: "spring", stiffness: 90, damping: 10 }}
           onClick={handleClick} className=' cursor-pointer pl-[20px] pr-[15px] text-[16px] py-[8px] flex justify-center items-center gap-1 hover:shadow-lg rounded-full duration-100 bg-gradient-to-r from-violet-600 to-indigo-600 hover:bg-indigo-600 active:scale-95 text-white font-medium'>
            <span className="pr-1">Get started</span>
            <span className=" text-[20px] flex justify-center items-center animate-bounce-x"><ArrowRight /></span>
          </motion.button>
        </div>
        <div className="w-[250px] h-[250px] left-[10%] top-[20%] bg-purple-500 bg-opacity-30 rounded-full blur-[200px] absolute">

        </div>
        <div className="w-[300px] h-[300px] top-[50%] right-[10%] bg-indigo-500 bg-opacity-30 rounded-full blur-[200px] absolute">

        </div>
      </div>
      )}
    </div>
  )
}


export default Home