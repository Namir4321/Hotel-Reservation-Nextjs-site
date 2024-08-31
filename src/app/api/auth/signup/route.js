import { RegisterSchema, validateZodSchema } from "@/utils/FormValidation";
import { hashPassword } from "@/utils/action";
import db from "@/utils/db";
import { NextResponse } from "next/server";
export const POST = async (req) => {
  try {
    const data = await req.json();
    const validatedFields = await validateZodSchema(RegisterSchema, data);
    delete validatedFields.ConfirmPassword;

    const user = await db.profile.findUnique({
      where: { email: validatedFields.email },
    });
    if (user)
      return NextResponse.json(
        { message: "Email already registered.Please login" },
        { status: 400 }
      );
    const usernamesearch = await db.profile.findUnique({
      where: { username: validatedFields.username },
    });
    if (usernamesearch)
      return NextResponse.json(
        { message: "Username already existed.Choose another username" },
        { status: 400 }
      );
    const hashedPassword = await hashPassword(validatedFields.password, 10);
    validatedFields.password = hashedPassword;
    await db.profile.create({
      data: {
        ...validatedFields,
        profileImage:
          "https://tizqinoyhtxjnpdbotyk.supabase.co/storage/v1/object/public/hotel-booking-images/no-dp_16.webp",
      },
    });
    // redirect("/")
    return NextResponse.json({ message: "SignUp Sucessfull" }, { status: 200 });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
};
