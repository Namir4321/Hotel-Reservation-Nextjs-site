import { createClient } from "@supabase/supabase-js";

const bucket = "hotel-booking-images";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(url, key);

export const uploadImage = async (image) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });

  if (!data)
    return {
      message: "Image upload failed.",
    };

  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
