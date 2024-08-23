"use server";
import db from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  imageSchema,
  ProfileSchema,
  propertySchema,
  validateZodSchema,
} from "./FormValidation";
import { auth } from "@/auth";
import { Select } from "@radix-ui/react-select";
import { uploadImage } from "@/utils/supabase";

export const getAuthUser = async () => {
  const session = await auth();
  if (!session) redirect("/signin");
  const UserDetails = session?.user;
  const profile = await db.profile.findUnique({
    where: { email: UserDetails?.email },
  });
  if (!profile) redirect("/signin");
  if (!profile.firstName) {
    redirect("/profile/create");
  }
  return profile;
};

export const createProfileAction = async (prevState, formData) => {
  try {
    const session = await auth();
    if (!session) return null;
    const UserDetails = session?.user;
    const profile = await db.profile.findUnique({
      where: { email: UserDetails?.email },
    });

    const rawData = Object.fromEntries(formData);
    const validateFields = await validateZodSchema(ProfileSchema, rawData);

    await db.profile.update({
      where: { email: profile.email },
      data: { ...validateFields },
    });
  } catch (error) {
    console.log(error);
    return {
      message: error.message || "There was an error updating your profile.",
    };
  }
  redirect("/");
};

export const getProfileImage = async () => {
  const session = await auth();
  const email = session?.user.email;
  if (!email) return null;
  const profile = await db.profile.findUnique({
    where: {
      email,
    },
    select: {
      profileImage: true,
    },
  });
  return profile?.profileImage;
};
export const getProfile = async () => {
  const user = await getAuthUser();
  const profile = await db.profile.findUnique({
    where: { email: user.email },
  });
  if (!profile) redirect("/profile/create");
  return profile;
};
export const updateProfileAction = async (prevState, formData) => {
  const email = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validateFields = await validateZodSchema(ProfileSchema, rawData);
    await db.profile.update({
      where: { email: user.email },
      data: validateFields,
    });
    revalidatePath("/profile ");
    return { message: "Profile Updated successfully" };
  } catch (error) {
    return {
      message: error.message || "There was an error updating your profile.",
    };
  }
};
export const updateProfileImageAction = async (prevState, formData) => {
  const user = await getAuthUser();
  try {
    const image = formData.get("image");
    const validateFields = await validateZodSchema(imageSchema, { image });
    const fullpath = await uploadImage(validateFields.image);
    await db.profile.update({
      where: {
        email: user.email,
      },
      data: {
        profileImage: fullpath,
      },
    });
    revalidatePath("/profile");
    return { message: "profile image updated successfully" };
  } catch (error) {
    return {
      message: error.message || "There was an error updating your profile picture.",
    };
  }
};

export const createProperyAction = async (prevState, formData) => {
  const user = await getAuthUser();
  const UserId = user.id;
  try {
    const rawData = Object.fromEntries(formData);
    console.log(rawData);
    const image = formData.get("image");
    const validateFields = await validateZodSchema(propertySchema, rawData);
    const validateFile = await validateZodSchema(imageSchema, { image });
    const fullpath = await uploadImage(validateFile.image);

    await db.property.create({
      data: {
        ...validateFields,
        image: fullpath,
        profileId: UserId,
      },
    });
  } catch (err) {
    return { message: err };
  }
  redirect("/");
};

export const fetchProperties = async ({ search = "", category }) => {
  const properties = await db.property.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { tagline: { contains: search, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      name: true,
      tagline: true,
      country: true,
      price: true,
      image: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return properties;
};
export const fetchFavouriteId = async ({ propertyId }) => {
  const user = await getAuthUser();
  const favourite = await db.favourite.findFirst({
    where: {
      propertyId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favourite?.id || null;
};
export const toggleFavouriteAction = async ({
  propertyId,
  favouriteId,
  pathname,
}) => {
  console.log(propertyId, favouriteId, pathname);
  const user = await getAuthUser();
  try {
    if (favouriteId) {
      await db.favourite.delete({
        where: {
          id: favouriteId,
        },
      });
    } else {
      await db.favourite.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favouriteId ? "Removed from Favourites" : "Added to Favourites",
    };
  } catch (error) {
    return { message: error };
  }
};

export const fetchFavourites = async () => {
  const user = await getAuthUser();
  const favourites = await db.favourite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          country: true,
          price: true,
          image: true,
        },
      },
    },
  });
  return favourites.map((favourites) => favourites.property);
};

export const fetchPropertyDetails = (id) => {
  return db.property.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
};
