import { fetchFavouriteId, getAuthUser } from "@/utils/action";
import { CardSigninButton } from "../form/Submit";
import FavouriteToogleForm from "./FavouriteToogleForm";

const FavouriteToggleButton = async ({ propertyId }) => {
  const user=await getAuthUser();
 
  if(!user) return <CardSigninButton />
  const favouriteId=await fetchFavouriteId({propertyId})
  return <FavouriteToogleForm favouriteId={favouriteId} propertyId={propertyId}/>
};

export default FavouriteToggleButton;
