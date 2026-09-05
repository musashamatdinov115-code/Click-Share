import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onSuccess: () => void;
}

export function LoginModal({ isOpen, onClose, onSwitchToRegister, onSuccess }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    }

    if (!isValid) return;

    // 1. localStorage-tan aldın saqlanǵan qollanıwshını oqıp alamız
    const savedUserStr = localStorage.getItem("user");

    if (!savedUserStr) {
      toast.error("User not found! Please register first.", { autoClose: 3000 });
      return;
    }

    const savedUser = JSON.parse(savedUserStr);

    // 2. Email menen paroldı duris tekseremiz
    if (savedUser.email !== email) {
      toast.error("Invalid email address!", { autoClose: 3000 });
      return;
    }

    if (savedUser.password !== password) {
      toast.error("Invalid password!", { autoClose: 3000 });
      return;
    }

    // 3. Bári duris bolsa ǵana token berip, kirgizemiz
    localStorage.setItem("token", "mock-jwt-token-12345");
    toast.success("Login successful!", { autoClose: 2000 });
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[450px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Login</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <Label className="text-gray-700">Email</Label>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-gray-50 ${emailError ? "border-red-500 focus-visible:ring-red-500" : "border-gray-200"}`}
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          <div className="space-y-1">
            <Label className="text-gray-700">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`bg-gray-50 pr-10 ${passwordError ? "border-red-500 focus-visible:ring-red-500" : "border-gray-200"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </div>

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5">
            Login
          </Button>

          <div className="text-center text-sm text-gray-600 pt-2">
            Don't have an account?{" "}
            <button type="button" onClick={onSwitchToRegister} className="text-indigo-600 hover:underline font-medium">
              Sign up now!
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}