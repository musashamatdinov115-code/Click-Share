import { Card } from "@/shared/ui/card";
import { Link } from "react-router";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/shared/ui/button";

function Header() {
  return (
    <div>
      <Card className="rounded-sm flex justify-between p-[13px] border-1 border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <Link to={"/"}>
              <img
                className="h-[30px] sm:h-[35px] object-contain active:scale-95 duration-100"
                src="https://click-shop-gamma.vercel.app/assets/logo-9Ko-r52I.jpg"
                alt="Header Shop"
              />
            </Link>
          </div>
          <div className="flex justify-end items-center gap-[15px]">
            <div className="hidden sm:block">
              <div className="relative border-[2px] rounded-full overflow-hidden border-indigo-600">
                <input
                  type="text"
                  className="px-[18px] py-[5px] pr-[40px] font-medium outline-none text-[14px]"
                  placeholder="Search"
                />
                <div className="absolute top-[2px] right-[2px] bottom-[2px] rounded-full hover:bg-indigo-50 active:scale-95 cursor-pointer w-[30px] flex justify-center items-center">
                  <Search size={15} />
                </div>
              </div>
            </div>

            <Link to={"/basket"} className="flex cursor-pointer group text-[22px] relative justify-center items-center gap-[5px]">
              <Heart size={22} />
              <span className="text-[12px] absolute top-[-10px] pt-[2px] right-[-10px] font-semibold flex justify-center items-center w-[20px] h-[20px] bg-indigo-600 rounded-full text-white">0</span>
            </Link>
            <Link to={"/favourite"} className="flex cursor-pointer group text-[22px] relative justify-center items-center gap-[5px]">
              <div className="flex text-[22px] relative justify-center items-center gap-[5px]">
                <ShoppingCart size={22} />
                <span className="text-[12px] absolute top-[-10px] pt-[2px] right-[-10px] font-semibold flex justify-center items-center w-[20px] h-[20px] bg-indigo-600 rounded-full text-white">0</span>
              </div>
              <span className="text-[14px] font-semibold group-hover:text-indigo-600">$0.00</span>
            </Link>

            <div>
              <div className=" flex justify-center items-center gap-1">
                <Button className='cursor-pointer flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 to-indigo-500 text-white font-bold py-4.5 px-6 rounded-full hover:from-indigo-500 hover:to-blue-700 transition-all duration-300 shadow-md'>
                  <span className="text-[16px] font-medium">Login</span>

                </Button>
                
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Header;
