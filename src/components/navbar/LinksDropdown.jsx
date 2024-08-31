import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";
import UserIcon from "./UserIcon";
import { auth } from "@/auth";
import { NavLink } from "@/utils/link";
import SignoutLink from "./SignoutLink";
import { handleLogout } from "@/lib/AuthAction";
const LinksDropdown = async () => {
  const session = await auth();
  const isLoggedIn = session?.user?.id;
  const isAdminUser = isLoggedIn === process.env.ADMIN_USER_ID;
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="w-6 h-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="start" sideOffset={10}>
        {isLoggedIn ? (
          <>
            {NavLink.map((link) => {
              if(link.label ==='admin' && !isAdminUser) return null
              return (
                <>
                  <DropdownMenuItem key={link.href}>
                    <Link href={link.href} className="capitalize w-full">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                </>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignoutLink key="one" />
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem className="flex flex-col gap-4">
              <Link href="/signin" key="/signin" className="capitalize w-full">
                Login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/signup"
                key="/signup"
                className="capitalize w-full"
              >
                Register
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
};

export default LinksDropdown;
