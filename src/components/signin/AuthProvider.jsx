import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ArrowBigLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { handleGithubLogin, handleGoogleLogin } from "@/lib/AuthAction";
const AuthProvider = () => {
  return (
    <>
    <div className="flex flex-col gap-3 max-w-sm ">
      <form action={handleGoogleLogin}>
        <Button
          variant="outline"
          size="lg"
          className="gap-4 group flex justify-start w-full"
        >
          <FcGoogle className="w-5 h-5" /> Continue with Github
          <ArrowRight className="text-sm w-4 h-4 hidden group-hover:block hover:bg-transparent" />
        </Button>
      </form>
      <form action={handleGithubLogin}>
        <Button
          variant="outline"
          size="lg"
          className="gap-4 group flex justify-start w-full"
        >
          <GitHubLogoIcon className="w-5 h-5" /> Continue with Github
          <ArrowRight className="text-sm w-4 h-4 hidden group-hover:block hover:bg-transparent" />
        </Button>
      </form>
      <div className="flex flex-row gap-5 mt-1 items-center max-w-sm">
        <hr className="w-3/4 border-t border-gray-300" />
        <span className="text-center text-sm">or</span>
        <hr className="w-3/4 border-t border-gray-300" />
      </div>
    </div>
    </>
  );
};

export default AuthProvider;
