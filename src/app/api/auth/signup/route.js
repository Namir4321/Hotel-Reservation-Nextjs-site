import { RegisterSchema, validateZodSchema } from "@/utils/FormValidation";
import { hashPassword } from "@/utils/action";
import db from "@/utils/db";
import { NextResponse } from "next/server";
export const POST = async (req) => {
  try {
    const datadetail = await req.json();
    if (!datadetail) return;
    const hashedPassword = await hashPassword(datadetail.password, 10);
    datadetail.password = hashedPassword;
    delete datadetail.confirmPassword;
    const user = await db.profile.findUnique({
      where: { email: datadetail.email },
    });
    if (user)
      return NextResponse.json(
        { message: "Email already registered. Please login." },
        { status: 400 }
      );
    const usernamesearch = await db.profile.findUnique({
      where: { username: datadetail.username },
    });
    if (usernamesearch)
      return NextResponse.json(
        { message: "Username already existed.Choose another username" },
        { status: 400 }
      );
    await db.profile.create({
      data: {
        ...datadetail,
        profileImage:
          "https://tizqinoyhtxjnpdbotyk.supabase.co/storage/v1/object/public/hotel-booking-images/no-dp_16.webp",
      },
    });
    return NextResponse.json({ message: "SignUp Sucessfull" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
};
