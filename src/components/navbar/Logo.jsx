import Link from "next/link";
import { Button } from "../ui/button";
import { FaCaravan } from "react-icons/fa";


const Logo = () => {
  return (
    <div>
      <Button size="icon" asChild>
        <Link href="/">
          <FaCaravan className="w-7 h-7" />
        </Link>
      </Button>
    </div>
  );
};

export default Logo;
