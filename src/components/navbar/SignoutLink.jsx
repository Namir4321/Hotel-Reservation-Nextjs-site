"use client";
import { handleLogout } from "@/lib/AuthAction";
import { useToast } from "../ui/use-toast";
const SignoutLink = () => {
  const { toast } = useToast();
  const handleLogoutRoute = async () => {
    await handleLogout();
    toast({ description: "You have been signed out" });
  };
  return (
    <div>
      <button className="w-full " onClick={handleLogoutRoute}>
        Logout
      </button>
    </div>
  );
};

export default SignoutLink;
