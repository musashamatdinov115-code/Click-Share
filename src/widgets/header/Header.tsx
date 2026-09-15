import { Card } from "@/shared/ui/card";
import { Link } from "react-router";
import { CircleUserRound, Heart, LogOut, Search, ShoppingCart, User, ShieldAlert } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useState } from "react";
import { LoginModal } from "@/auth/ui/Login";
import { RegisterModal } from "@/auth/ui/Register";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { useFavorites } from "@/features/favorites/useFavourites";
import { useBasket } from "@/features/cart/useBasket";
import { toast } from "react-toastify";

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(() => localStorage.getItem("role"));

  const [userName, setUserName] = useState<string>(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user.name || "Profile";
    } catch {
      return "Profile";
    }
  });

  const { favorites } = useFavorites();
  const { totalCount, totalPrice } = useBasket();
  const handleLoginSuccess = () => {

    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.name) setUserName(user.name);
    } catch {
      setUserName("Profile");
    }
    window.dispatchEvent(new Event("auth_changed"))
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setToken(null);
    setRole(null);
    setUserName("Profile");

    window.dispatchEvent(new Event("auth_changed"));

    toast.success("You have successfully logged out.", { autoClose: 2000 });
  };

  const isAdmin = role === "admin" || role === "super_admin";

  return (
    <div>
      <Card className="rounded-sm flex justify-between p-[13px] border-1 border-gray-200">
        <div className="flex justify-between items-center w-full">
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
              <span className="text-[12px] absolute top-[-10px] pt-[2px] right-[-10px] font-semibold flex justify-center items-center w-[20px] h-[20px] bg-indigo-600 rounded-full text-white">
                {favorites.length}
              </span>
            </Link>

            <Link to={"/basket"} className="flex cursor-pointer group text-[22px] relative justify-center items-center gap-[5px]">
              <div className="flex text-[22px] relative justify-center items-center gap-[5px]">
                <ShoppingCart size={22} />
                <span className="text-[12px] absolute top-[-10px] pt-[2px] right-[-10px] font-semibold flex justify-center items-center w-[20px] h-[20px] bg-indigo-600 rounded-full text-white">{totalCount}</span>
              </div>
              <span className="text-[14px] font-semibold group-hover:text-indigo-600">${totalPrice.toLocaleString()}</span>
            </Link>

            <div>
              <div className="flex justify-center items-center gap-1">
                {token ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button className="cursor-pointer flex items-center justify-center bg-gradient-to-r from-blue-700 to-indigo-500 text-white font-bold py-4 px-3 rounded-full hover:from-indigo-500 hover:to-blue-700 transition-all duration-300 shadow-md">
                        <CircleUserRound size={18} />
                        <span className="text-[16px] font-medium">{isAdmin ? "Admin" : "Profile"}</span>
                      </Button>
                    } />
                    <DropdownMenuContent align="end" className="w-48 bg-white p-2 shadow-lg rounded-sm border">
                      <Link to="/profile">
                        <DropdownMenuItem className="flex items-center gap-2 text-gray-700 font-medium hover:bg-gray-100 rounded-md cursor-pointer">
                          <User size={16} className="text-gray-500" />
                          <span className="capitalize text-sm">{userName}</span>
                        </DropdownMenuItem>
                      </Link>

                      <DropdownMenuSeparator className="my-1 border-t border-gray-100" />

                      {isAdmin && (
                        <Link to="/admin">
                          <DropdownMenuItem className="flex items-center gap-2 text-gray-700 font-medium hover:bg-gray-100 rounded-md cursor-pointer">
                            <ShieldAlert size={16} className="text-indigo-500" />
                            <span className="capitalize text-sm">Dashboard</span>
                          </DropdownMenuItem>
                        </Link>
                      )}

                      <DropdownMenuSeparator className="my-1 border-t border-gray-100" />

                      <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-md cursor-pointer">
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
                onSuccess={handleLoginSuccess}

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
      </Card>
    </div>
  );
}

export default Header;