import Stripe from "stripe";
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
import { NextRequest,NextResponse } from "next/server";
import db from "@/utils/db";
import { formatDate } from "@/utils/format";

export const POST=async(req,res)=>{
    const requestHeaders=new Headers(req.headers);
    // const origin=requestHeaders.get("origin");
    const origin = process.env.NEXT_PUBLIC_PRODUCTION_WEBSITE_URL;
    const {bookingId}=await req.json()
    const booking=await db.booking.findUnique({
        where:{id:bookingId},
        include:{
            property:{
                select:{
                    name:true,image:true
                }
            },
            profile:{
                select:{
                    firstName:true,lastName:true,email:true
                }
            }
        }
    })
    if(!booking){
        return Response.json(null,{
            status:404,
            statusText:"Not Found",
        })
    }
    const {totalNights,orderTotal,checkIn,checkOut,property:{image,name},profile:{firstName,lastName,email}}=booking

    try{
const session = await stripe.checkout.sessions.create({
  ui_mode: "embedded",
  metadata: { bookingId: booking.id },
  line_items: [
    {
      quantity: 1,
      price_data: {
        currency: "inr",
        product_data: {
          name: `${name}`,
          images: [image],
          description: `Stay in this wonderfull place
                for ${totalNights} Night from ${formatDate(
            checkIn
          )} to ${formatDate(checkOut)}. Enjoy your stay!`,
        },
        unit_amount: orderTotal * 100,
      },
    },
  ],
  customer_email: email,
  billing_address_collection: "required", 

  mode: "payment",
  return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
});
return Response.json({clientSecret:session.client_secret})
    }catch(err){
console.log(err)
return Response.json(null,{status:500,statusText:"Internal Server Error"})
    }
};