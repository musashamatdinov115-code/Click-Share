import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { Eye, EyeOff } from "lucide-react";

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login tekseriw
    localStorage.setItem("token", "mock-jwt-token-12345");
    localStorage.setItem("user", JSON.stringify({ email, name: "Musa" }));

    onSuccess();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-6 bg-white rounded-xl shadow-lg border-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Login</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-50 pr-10"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
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