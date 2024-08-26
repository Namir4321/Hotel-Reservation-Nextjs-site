"use server";
import db from "@/utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  imageSchema,
  ProfileSchema,
  propertySchema,
  validateZodSchema,
  ReviewSchema,
} from "./FormValidation";
import { auth } from "@/auth";
import { Select } from "@radix-ui/react-select";
import { uploadImage } from "@/utils/supabase";
import { calculateTotals } from "./CalculateTotals";

export const getAuthUser = async () => {
  const session = await auth();
  if (!session) return null;
  const UserId = session.user.id;
  return UserId;
};

export const createProfileAction = async (prevState, formData) => {
  try {
    const user = await getAuthUser();
    if (!user) return null;
    const profile = await db.profile.findUnique({
      where: { id: user },
    });

    const rawData = Object.fromEntries(formData);
    const validateFields = await validateZodSchema(ProfileSchema, rawData);

    await db.profile.update({
      where: { email: profile.email },
      data: { ...validateFields },
    });
  } catch (error) {
    return {
      message: error.message || "There was an error updating your profile.",
    };
  }
  redirect("/");
};

export const getProfileImage = async () => {
  const user = await getAuthUser();
  if (!user) return null;
  const profile = await db.profile.findUnique({
    where: {
      id: user,
    },
    select: {
      profileImage: true,
    },
  });
  return profile?.profileImage;
};
export const getProfile = async () => {
  const user = await getAuthUser();
  if (!user) return null;
  const profile = await db.profile.findUnique({
    where: { id: user },
  });
  if (!profile.firstName) redirect("/profile/create");
  return profile;
};
export const updateProfileAction = async (prevState, formData) => {
  const user = await getAuthUser();
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
        id: user,
      },
      data: {
        profileImage: fullpath,
      },
    });
    revalidatePath("/profile");
    return { message: "profile image updated successfully" };
  } catch (error) {
    return {
      message:
        error.message || "There was an error updating your profile picture.",
    };
  }
};

export const createProperyAction = async (prevState, formData) => {
  const user = await getAuthUser();
  const UserId = user.id;
  try {
    const rawData = Object.fromEntries(formData);

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
  // console.log(propertyId)
  const user = await getAuthUser();
  try {
    const favorite = await db.favourite.findFirst({
      where: {
        propertyId,
        profileId: user,
      },
      select: {
        id: true,
      },
    });
    return favorite.id || null;
  } catch (err) {}
};
export const toggleFavouriteAction = async ({
  propertyId,
  favouriteId,
  pathname,
}) => {
  // console.log(propertyId)
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
          profileId: user,
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
      profileId: user,
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
      bookings: {
        select: {
          checkIn: true,
          checkOut: true,
        },
      },
    },
  });
};

export const createReviewAction = async (prevState, formData) => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validateFields = await validateZodSchema(ReviewSchema, rawData);
    await db.review.create({
      data: {
        ...validateFields,
        profileId: user,
      },
    });
    revalidatePath(`properties/${validateFields.propertyId}`);
    return { message: "review submitted successfully" };
  } catch (err) {
    console.log(err.message);
    return { message: err.message };
  }
};
export const fetchPropertyReview = async ({ propertyId }) => {
  const reviews = await db.review.findMany({
    where: {
      propertyId,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      profile: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return reviews;
};
export const fetchPropertyReviewByUser = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: {
      profileId: user,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      property: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return reviews;
};
export const deleteReviewAction = async ({ reviewId }) => {
  const user = await getAuthUser();
  try {
    await db.review.delete({
      where: { id: reviewId, profileId: user },
    });
    revalidatePath("/review");
    return { message: "Review deleted successfully" };
  } catch (err) {
    return { message: err.message };
  }
};

export const fetchPropertyRating = async ({ propertyId }) => {
  const result = await db.review.groupBy({
    by: ["propertyId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: { propertyId },
  });
  return {
    rating: result[0]?._avg.rating?.toFixed() ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
};

export const findExistingReview = async ({ userId, propertyId }) => {
  return db.review.findFirst({
    where: {
      profileId: userId,
      propertyId: propertyId,
    },
  });
};

export const createBookingAction = async({
  propertyId,
  checkIn,
  checkOut,
}) => {
  console.log(propertyId,checkIn,checkOut)
  const user = await getAuthUser();
  const property = await db.property.findUnique({
    where: { id: propertyId },
    select: { price: true },
  });
  if (!property) {
    return { message: "Property not found" };
  }

  const { orderTotal, totalNights } = calculateTotals({
    checkIn,
    checkOut,
    price: property.price,
  });
  try {
    const booking = await db.booking.create({
      data: {
        checkIn,
        checkOut,
        orderTotal,
        totalNights,
        profileId: user,
        propertyId,
      },
    });
  } catch (err) {
    return { message: err.message };
  }
  redirect('/booking')
};
