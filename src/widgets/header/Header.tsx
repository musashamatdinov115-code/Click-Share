import { Card } from "@/shared/ui/card";
import { Link } from "react-router";
import { Search } from "lucide-react";

function Header() {
  return (
    <div className="p-2">
      <Card className="rounded-sm flex justify-between p-1">
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
                  <Search size={15}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Header;
