import { LuUser2 } from "react-icons/lu";
import { getProfileImage } from "@/utils/action";
const UserIcon = async () => {
  
  const profileImage = await getProfileImage();
  if (!profileImage) {
    return <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />;
  }
  return (
    <img
      src={profileImage}
      alt="Profile Image"
      className="w-6 h-6 rounded-full object-cover"
    />
  );
};

export default UserIcon;
