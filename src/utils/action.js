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
  SignImSchema,
  RegisterSchema,
} from "./FormValidation";
import { auth } from "@/auth";
import { Select } from "@radix-ui/react-select";
import { uploadImage } from "@/utils/supabase";
import { calculateTotals } from "./CalculateTotals";
import { formatDate } from "./format";
import bcryptjs from "bcryptjs";
import { hash } from "crypto";
export const getAuthUser = async () => {
  const session = await auth();
  if (!session) return null;
  const UserId = session.user.id;
  return UserId;
};

export const isAdminUser = async () => {
  const user = await getAuthUser();
  if (user !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};
export const hashPassword = async (password, saltRounds) => {
  console.log(password);
  try {
    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    return { message: err.message || "Password is not hased" };
  }
};
export const findUserByEmail = async (email, password) => {
  const user = await db.profile.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return { message: "User not found" };
  }
  const hashedpassword = await bcryptjs.compare(password, user.password);
  if (!hashedpassword) {
    return { message: "Invalid Email and Pasword" };
  }
  const {
    password: _password,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    ...userdetails
  } = user;
  return { userdetails };
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
      where: { id: user },
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
  const UserId = user;
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

export const createBookingAction = async ({
  propertyId,
  checkIn,
  checkOut,
}) => {
  const user = await getAuthUser();
  await db.booking.deleteMany({
    where: {
      profileId: user,
      paymentStatus: false,
    },
  });
  let bookingId = null;
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
    bookingId = booking.id;
  } catch (err) {
    return { message: err.message };
  }
  redirect(`/checkout?bookingId=${bookingId}`);
};
export const fetchBookings = async () => {
  const user = await getAuthUser();
  const bookings = await db.booking.findMany({
    where: {
      profileId: user,
      paymentStatus: true,
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          country: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return bookings;
};

export const deleteBookingAction = async ({ bookingId }) => {
  const user = await getAuthUser();
  try {
    const result = await db.booking.delete({
      where: {
        id: bookingId,
        profileId: user,
      },
    });
    revalidatePath("/booking");
    return { message: "Booking deleted successfully" };
  } catch (err) {
    return { message: err.message };
  }
};

export const fetchRentals = async () => {
  const user = await getAuthUser();
  const rentals = await db.property.findMany({
    where: {
      profileId: user,
    },
    select: {
      id: true,
      name: true,
      price: true,
    },
  });
  const rentalsWithBookingSums = await Promise.all(
    rentals.map(async (rental) => {
      const totalNightsSum = await db.booking.aggregate({
        where: {
          propertyId: rental.id,
          paymentStatus: true,
        },
        _sum: {
          totalNights: true,
        },
      });
      const orderTotalSum = await db.booking.aggregate({
        where: { propertyId: rental.id, paymentStatus: true },
        _sum: {
          orderTotal: true,
        },
      });

      return {
        ...rental,
        totalNightsSum: totalNightsSum._sum.totalNights,
        orderTotalSum: orderTotalSum._sum.orderTotal,
      };
    })
  );
  return rentalsWithBookingSums;
};

export const deletePropertyAction = async ({ propertyId }) => {
  const user = getAuthUser();
  try {
    await db.property.delete({
      where: {
        id: propertyId,
        profileId: user,
      },
    });
    revalidatePath("/rentals");
    return { message: "Property deleted successfully" };
  } catch (err) {
    return { message: err.message };
  }
};

export const fetchRentalDetails = async (propertyId) => {
  const user = await getAuthUser();
  return db.property.findUnique({
    where: {
      id: propertyId,
      profileId: user,
    },
  });
};

export const updatePropertyAction = async (prevState, formData) => {
  const user = await getAuthUser();
  const propertyId = formData.get("id");

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = await validateZodSchema(propertySchema, rawData);
    await db.property.update({
      where: {
        id: propertyId,
        profileId: user,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/rentals/${propertyId}/edit`);
    return { message: "Update Successful" };
  } catch (err) {
    return { message: err.message };
  }
};
export const updatePropertyImageAction = async (prevState, formData) => {
  const user = await getAuthUser();

  const propertyId = formData.get("id");
  try {
    const image = formData.get("image");
    const validateFields = await validateZodSchema(imageSchema, { image });
    const fullpath = await uploadImage(validateFields.image);
    await db.property.update({
      where: {
        id: propertyId,
        profileId: user,
      },
      data: {
        image: fullpath,
      },
    });
    revalidatePath(`/rentals/${propertyId}/edit`);
    return { message: "Update Image Successful" };
  } catch (err) {
    return { message: err.message };
  }
};

export const fetchReservations = async () => {
  const user = await getAuthUser();
  const reservation = await db.booking.findMany({
    where: {
      paymentStatus: true,
      property: {
        profileId: user,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          price: true,
          country: true,
        },
      },
    },
  });
  return reservation;
};
export const fetchStatus = async () => {
  const Admin = await isAdminUser();
  const usersCount = await db.profile.count();
  const propertiesCount = await db.property.count();
  const bookingsCount = await db.booking.count({
    where: {
      paymentStatus: true,
    },
  });

  return {
    usersCount,
    propertiesCount,
    bookingsCount,
  };
};

export const fetchChartsData = async () => {
  const isAdmin = await isAdminUser();
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  const sixMinthAgo = date;

  const bookings = await db.booking.findMany({
    where: {
      paymentStatus: true,
      createdAt: {
        gte: sixMinthAgo,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  let bookingsPerMonth = bookings.reduce((total, current) => {
    const date = formatDate(current.createdAt, true);
    const existingEntry = total.find((entry) => entry.date === date);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      total.push({ date, count: 1 });
    }
    return total;
  }, []);
  return bookingsPerMonth;
};

export const fetchReservationStatus = async () => {
  const user = await getAuthUser();
  const properties = await db.property.count({
    where: { profileId: user },
  });
  const totals = await db.booking.aggregate({
    _sum: {
      orderTotal: true,
      totalNights: true,
    },
    where: {
      property: {
        profileId: user,
      },
    },
  });
  return {
    properties,
    nights: totals._sum.totalNights || 0,
    amount: totals._sum.orderTotal || 0,
  };
};
