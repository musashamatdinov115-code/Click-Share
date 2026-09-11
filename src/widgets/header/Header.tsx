import { Card } from "@/shared/ui/card";
import { Link } from "react-router";
import { CircleUserRound, Heart, LogOut, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useEffect, useState } from "react";
import { LoginModal } from "@/auth/ui/Login";
import { RegisterModal } from "@/auth/ui/Register";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const [userName, setUserName] = useState("Profile");

  const checkAuth = () => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    setToken(savedToken);

    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.name) {
          setUserName(parsed.name);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  const [favCount, setFavCount] = useState(0);

  const updateFavCount = () => {
    const items = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavCount(items.length);
  };

  useEffect(() => {
    updateFavCount();

    window.addEventListener("favorites_changed", updateFavCount);
    window.addEventListener("storage", updateFavCount); 

    return () => {
      window.removeEventListener("favorites_changed", updateFavCount);
      window.removeEventListener("storage", updateFavCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserName("Profile");
  };
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

            <Link to={"/favourite"} className="flex cursor-pointer group text-[22px] relative justify-center items-center gap-[5px]">
              <Heart size={22} />
              <span className="text-[12px] absolute top-[-10px] pt-[2px] right-[-10px] font-semibold flex justify-center items-center w-[20px] h-[20px] bg-indigo-600 rounded-full text-white">{favCount}</span>
            </Link>
            <Link to={"/basket"} className="flex cursor-pointer group text-[22px] relative justify-center items-center gap-[5px]">
              <div className="flex text-[22px] relative justify-center items-center gap-[5px]">
                <ShoppingCart size={22} />
                <span className="text-[12px] absolute top-[-10px] pt-[2px] right-[-10px] font-semibold flex justify-center items-center w-[20px] h-[20px] bg-indigo-600 rounded-full text-white">0</span>
              </div>
              <span className="text-[14px] font-semibold group-hover:text-indigo-600">$0.00</span>
            </Link>

            <div>
              <div className=" flex justify-center items-center gap-1">
                {token ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button className="cursor-pointer flex items-center justify-center bg-gradient-to-r from-blue-700 to-indigo-500 text-white font-bold py-4 px-3 rounded-full hover:from-indigo-500 hover:to-blue-700 transition-all duration-300 shadow-md">
                        <CircleUserRound size={18} />
                        <span className="text-[16px] font-medium">Profile</span>
                      </Button>
                    } />

                    <DropdownMenuContent align="end" className="w-48 bg-white p-2 shadow-lg rounded-sm border">

                      <Link to="/profile" >
                        <DropdownMenuItem className={"flex items-center gap-2  text-gray-700 font-medium hover:bg-gray-100 rounded-md cursor-pointer"}>
                          <User size={16} className="text-gray-500" />
                          <span className="capitalize text-sm">{userName}</span>
                        </DropdownMenuItem>
                      </Link>

                      <DropdownMenuSeparator className="my-1 border-t border-gray-100" />

                      <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2  text-red-600 hover:bg-red-50 rounded-md cursor-pointer">
                        <LogOut size={16} />
                        <span className="text-sm">Logout</span>
                      </DropdownMenuItem>

                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button onClick={() => setIsLoginOpen(true)} className="cursor-pointer flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 to-indigo-500 text-white font-bold py-4 px-6 rounded-full hover:from-indigo-500 hover:to-blue-700 transition-all duration-300 shadow-md">
                    <span className="text-[16px] font-medium">Login</span>

                  </Button>
                )}
              </div>

              <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSwitchToRegister={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }}
                onSuccess={() => {
                  checkAuth()
                }}
              />

              <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onSwitchToLogin={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }}
                onSuccess={() => { }}
              />


            </div>
          </div>
        </div>
      </Card >
    </div >

  );
}

export default Header;
