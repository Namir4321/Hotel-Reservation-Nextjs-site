import { fetchFavouriteId, getAuthUser } from "@/utils/action";
import { CardSigninButton } from "../form/Submit";
import FavouriteToogleForm from "./FavouriteToogleForm";

const FavouriteToggleButton = async ({ propertyId }) => {
  const userId = await getAuthUser();
  if(!userId) return <CardSigninButton />
  const favouriteId=await fetchFavouriteId({propertyId})
  return <FavouriteToogleForm favouriteId={favouriteId} propertyId={propertyId}/>
};

export default FavouriteToggleButton;
