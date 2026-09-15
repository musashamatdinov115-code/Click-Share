import { Lottie } from "lottie-react";
import { History } from "lucide-react";
import Error from "@/assets/Error.json"
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  })
  useEffect(() => {
    const handleAuthChange = () => {
      setToken(localStorage.getItem("token"));
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    };

    window.addEventListener("auth_changed", handleAuthChange);
    return () => {
      window.removeEventListener("auth_changed", handleAuthChange);
    };
  }, [])

  if (!token || !user) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center max-w-[1200px] mx-auto p-4">
        <div className="h-[300px] w-[300px]">
          <Lottie src={Error} autoplay loop />
        </div>
      </div>
    );
  }

  const userName = user.name
  const userEmail = user.email

  const isSuperAdmin = user.role === "super_admin";
  const isVerified = isSuperAdmin ? true : (user.isVerified || false);

  return (
    <div className="w-full mx-auto p-4">
      <div className={`border-b p-4 text-center ${isVerified ? "bg-green-100 border-green-100" : "bg-red-100 border-red-100"}`}>
        <p className="text-sm font-medium text-gray-800">
          Account: {isVerified ? <span className="text-green-600 font-semibold">Verified ✓</span> : <span className="text-red-600 font-semibold">Not verified !</span>}
        </p>
        {!isVerified && (
          <p className="text-xs text-gray-600 mt-0.5">
            An activation link has been sent to your email, click it to activate your account.
          </p>
        )}
      </div>

      <div className="p-6 text-center border-b border-gray-100 space-y-1">
        <p className="text-sm text-gray-700">
          User name: <span className="font-bold text-gray-900">{userName}</span>
        </p>
        <p className="text-sm text-gray-700">
          Email: <span className="font-bold text-gray-900">{userEmail}</span>
        </p>
        {isSuperAdmin && (
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mt-1">
            Super Administrator
          </p>
        )}
      </div>

      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="text-gray-400 mb-2">
          <History size={36} strokeWidth={1.5} />
        </div>
        <p className="text-sm font-medium text-gray-500">
          Your order history is empty
        </p>
      </div>
    </div>
  );
}