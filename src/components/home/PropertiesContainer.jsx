import { fetchProperties } from "@/utils/action";
import PropertiesList from "@/components/home/PropertiesList";
import EmptyList from "@/components/home/EmptyList";

const PropertiesContainer = async({category,search}) => {
const properties = await fetchProperties({ category, search });
if(properties.length===0){
      return (
        <EmptyList
          heading="No result"
          message="Try changing or removing some of your filters"
          btnText="Clear Filters"
        ></EmptyList>
      );
}  
return<PropertiesList properties={properties}></PropertiesList>
}

export default PropertiesContainer
