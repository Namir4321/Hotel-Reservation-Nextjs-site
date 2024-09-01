import { RegisterSchema, validateZodSchema } from "@/utils/FormValidation";
import { hashPassword } from "@/utils/action";
import db from "@/utils/db";
import { NextResponse } from "next/server";
export const POST = async (req) => {
  try {
    const data = await req.json();
    if (!data) return;
    const user = await db.profile.findUnique({
      where: { email: data.email },
    });
    if (user)
      return NextResponse.json(
        { message: "Email already registered. Please login." },
        { status: 400 }
      );
    const usernamesearch = await db.profile.findUnique({
      where: { username: data.username },
    });
    if (usernamesearch)
      return NextResponse.json(
        { message: "Username already existed.Choose another username" },
        { status: 400 }
      );
    return NextResponse.json({ message: "SignUp Sucessfull" }, { status: 200 });
  } catch (err) {
    console.log(err.data);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
};
