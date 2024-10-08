import {
  fetchPropertyDetails,
  findExistingReview,
  getAuthUser,
} from "@/utils/action";
import { redirect } from "next/navigation";
import ImageContainer from "@/components/properties/ImageContainer";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import FavouriteToggleButton from "@/components/card/FavouriteToggleButton";
import ShareButton from "@/components/properties/ShareButton";
import PropertyRating from "@/components/card/PropertyRating";
import PropertiesDetails from "@/components/properties/PropertiesDetails";
import PropertiesDescription from "@/components/properties/PropertiesDescription";
import { Separator } from "@/components/ui/separator";
import UserInfo from "@/components/properties/UserInfo";
import PropertiesAminites from "@/components/properties/PropertiesAminites";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitReview from "@/components/reviews/SubmitReview";
import PropertyReviews from "@/components/reviews/PropertyReviews";

const DynamicMap = dynamic(
  () => import("@/components/properties/PropertiesMap"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px w-full" />,
  }
);
const DynamicBookingWrapper = dynamic(
  () => import("@/components/bookings/BookingWrapper"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[200px] w-full" />,
  }
);
const PropertyDetailsPage = async ({ params }) => {
  const property = await fetchPropertyDetails(params.id);
  if (!property) redirect("/");
  const { id, baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };
  const firstName = property.profile.firstName;
  const propertyId = property.id;
  const profileImage = property.profile.profileImage;

  const userId = await getAuthUser();
  const isNotOwner = property.profile.id !== userId;
  const reviewDoesNotExist =
    userId && isNotOwner && !(await findExistingReview({ userId, propertyId }));
  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold capitalize">{property.tagline}</h1>
        <div className="flex items-center gap-x-4">
          <ShareButton name={property.name} propertyId={property.id} />
          <FavouriteToggleButton propertyId={property.id} />
        </div>
      </header>
      <ImageContainer mainimage={property.image} name={property.name} />
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-bold">{property.name}</h1>
            <PropertyRating inPage propertyId={property.id} />
          </div>
          <PropertiesDetails details={details} />
          <UserInfo profileImage={profileImage} firstName={firstName} />
          <Separator className="mt-4" />
          <PropertiesDescription description={property.description} />
          <PropertiesAminites amenities={property.amenities} />
          <DynamicMap CountryCode={property.country} />
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          <DynamicBookingWrapper
            propertyId={property.id}
            price={property.price}
            bookings={property.bookings}
          />
        </div>
      </section>
      {reviewDoesNotExist && <SubmitReview propertyId={property.id} />}
      <PropertyReviews propertyId={property.id} />
    </section>
  );
};

export default PropertyDetailsPage;
