import NavSearch from "./NavSearch";
import LinkDropdown from "./LinksDropdown";
import Logo from "./Logo";
import SignOutLink from "./SignoutLink";
import UserIcon from "./UserIcon";
import DarkMode from "./DarkMode"
const Navbar = () => {
  return (
<>
<nav className="border-b">
  <div className="container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
    <Logo/>
    <NavSearch/>
    <div className="flex gap-4 items-center">
      <DarkMode/>
      <LinkDropdown/>
    </div>
  </div>
</nav>
</>
  )
}

export default Navbar