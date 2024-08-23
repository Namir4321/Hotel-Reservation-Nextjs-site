"use client";
import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { getAuthUser } from "@/utils/action";

import { FaHeart, FaRegHeart } from "react-icons/fa";

const SubmitButton = ({ className, text, btnSize, variant }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant={variant || "default"}
      disabled={pending}
      className={`capitalize ${className}`}
      size={btnSize || "default"}
    >
      {pending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : text}
    </Button>
  );
};

export const CardSigninButton = async () => {
  const router = useRouter();

  const handleFavouriteLogin = async () => {
    const user = await getAuthUser();
    if (!user) router.push("/signin");
  };
  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className="p-2 cursor-pointer"
      onClick={handleFavouriteLogin}
    >
      <FaRegHeart />
    </Button>
  );
};

export const CardSubmitButton =  ({isFavourite}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="icon"
      variant="outline"
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <ReloadIcon className="animate-spin" />
      ) : isFavourite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};

export default SubmitButton;
