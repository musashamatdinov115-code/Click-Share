import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters", { autoClose: 3000 });
      return;
    }

    const newUser = { name, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    
    toast.success("Account created successfully! Please login.", { autoClose: 3000 });
    onClose();
    onSwitchToLogin(); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[450px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create account</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1">
            <Label>Your name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required className="bg-gray-50" />
          </div>

          <div className="space-y-1">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-gray-50" />
          </div>

          <div className="space-y-1">
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

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5">
            Create account
          </Button>

          <div className="text-center text-sm text-gray-600 pt-2">
            Have an account?{" "}
            <button type="button" onClick={onSwitchToLogin} className="text-indigo-600 hover:underline font-medium">
              Login now!
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}