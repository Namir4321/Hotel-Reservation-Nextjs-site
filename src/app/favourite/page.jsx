import { fetchFavourites } from "@/utils/action";
import EmptyList from "@/components/home/EmptyList";
import PropertiesList from "@/components/home/PropertiesList";
const FavouritePage = async() => {
const favourites = await fetchFavourites();
if(favourites.length===0){
  return <EmptyList/>
}
return <PropertiesList properties={favourites}/>
  
}

export default FavouritePage