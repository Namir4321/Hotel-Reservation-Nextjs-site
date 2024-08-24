import { Button } from "@/components/ui/button";
import CategoriesList from "@/components/home/CategoriesList";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { Suspense } from "react";
import LoadingCard from "@/components/card/LoadingCard";
export const maxDuration = 60;
const HomePage = ({ searchParams }) => {
  console.log(searchParams?.category);
  console.log(searchParams.search);
  return (
    <section>
      <CategoriesList
        category={searchParams?.category}
        search={searchParams.search}
      />
      <Suspense fallback={<LoadingCard/>}>
      <PropertiesContainer
        category={searchParams?.category}
        search={searchParams.search}
        />
        </Suspense>
    </section>
  );
};

export default HomePage;
