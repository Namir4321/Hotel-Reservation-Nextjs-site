import Stripe from "stripe";
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const bookingId = session.metadata?.bookingId;
    if (session.status !== "complete" || !bookingId) {
      return { message: "someething went wrong" };
    }
    await db.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: true,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(null,{
        status:500,
        statusText:"Internam Server Error"
    })
  }
  redirect('/booking')
};
