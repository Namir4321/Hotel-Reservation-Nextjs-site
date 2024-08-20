import Image from "next/image";
const UserInfo = ({ profileImage, firstName }) => {
  return (
    <article className="grid grid-cols-[auto,1fr] gap-4 mt-4">
      <Image
        src={profileImage}
        alt={firstName}
        width={50}
        height={50}
        className="rounded w-12 h-12 object-cover"
      />
      <div>
        <p>Hosted By <span className="font-bold">{firstName}</span></p>
      <p className="text-muted-foreground font-light">
        Superhost 2 years hosting
      </p>
      </div>
    </article>
  );
};

export default UserInfo;
