import { fetchPropertyDetails } from "@/utils/action";
import { redirect } from "next/navigation";
import ImageContainer from "@/components/properties/ImageContainer";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import FavouriteToggleButton from "@/components/card/FavouriteToggleButton";
import ShareButton from "@/components/properties/ShareButton";
import PropertyRating from "@/components/card/PropertyRating";
import BookingCalander from "@/components/properties/BookingCalander";
import PropertiesDetails from "@/components/properties/PropertiesDetails";
import PropertiesDescription from "@/components/properties/PropertiesDescription";
import { Separator } from "@/components/ui/separator";
import UserInfo from "@/components/properties/UserInfo";
import PropertiesAminites from "@/components/properties/PropertiesAminites";
import dynamic from "next/dynamic";
import {Skeleton} from "@/components/ui/skeleton"
const DynamicMap = dynamic(
  () => import("@/components/properties/PropertiesMap"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px w-full" />,
  }
);
const PropertyDetailsPage = async ({ params }) => {
  const property = await fetchPropertyDetails(params.id);
  if (!property) redirect("/");
  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };
  const firstName = property.profile.firstName;
  const profileImage = property.profile.profileImage;

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
          {/* Separator */}
          <Separator className="mt-4" />
          <PropertiesDescription description={property.description} />
          <PropertiesAminites amenities={property.amenities} />
       <DynamicMap CountryCode={property.country}/>
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          <BookingCalander />
        </div>
      </section>
    </section>
  );
};

export default PropertyDetailsPage;
