import PropertyCard from "@/components/card/PropertyCard";
const PropertiesList = ({properties}) => {
  return (
    <section className="mt-4 gap-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {properties.map((property)=>{
        return <PropertyCard key={property.name} property={property}/>
      })}
    </section>
  )
}

export default PropertiesList