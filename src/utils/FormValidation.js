import { z } from "zod";
export const ProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "firstname must be atleast 2 character" }),
  lastName: z
    .string()
    .min(2, { message: "lastname must be atleast 2 character" }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .optional(),
});

export const validateZodSchema = async (Schema, data) => {
  const validateResult = Schema.safeParse(data);

  if (!validateResult.success) {
    const errors = validateResult.error.errors.map((error) => error.message);

    throw new Error(errors.join(", "));
  }
  return validateResult.data;
};

const validateFile = () => {
  const maxUploadSize = 1024 * 1024 * 3;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "FileSize must be less than 2 mb")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "file must be an image");
};

export const imageSchema = z.object({
  image: validateFile(),
});

export const propertySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be atleast 2 character",
    })
    .max(100, {
      message: "name must be less than 100 character",
    }),
  tagline: z
    .string()
    .min(2, { message: "tagline must be 2 character long" })
    .max(100, { message: "tagline must be less than 100 character" }),
  price: z.coerce.number().int().min(0, {
    message: "price must be a positive number.",
  }),
  category: z.string(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words.",
    }
  ),
  country: z.string(),
  guests: z.coerce.number().int().min(0, {
    message: "guest amount must be a positive number.",
  }),
  bedrooms: z.coerce.number().int().min(0, {
    message: "bedrooms amount must be a positive number.",
  }),
  beds: z.coerce.number().int().min(0, {
    message: "beds amount must be a positive number.",
  }),
  baths: z.coerce.number().int().min(0, {
    message: "bahts amount must be a positive number.",
  }),
  amenities: z.string(),
});

export const ReviewSchema=z.object({
  propertyId:z.string(),
  rating:z.coerce.number().int().min(1).max(5),
  comment:z.string().min(10).max(1000)
})