'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Title from "./Title";
const PropertiesDescription = ({ description }) => {
  const [fulldescription, setFullDescrption] = useState(false);
  const words = description.split(" ");
  const isLongDescription = words.length > 100;
  const toggleDescription = () => {
    setFullDescrption(!fulldescription);
  };
  const dispalyDescription =
    isLongDescription && !fulldescription
      ? words.splice(0, 100).join(" ") + "..."
      : description;
  return (
    <article className="mt-4">
      <Title text="Description" />
      <p className="text-muted-foreground font-light leading-loose">
        {dispalyDescription}
      </p>
      {isLongDescription && (
        <Button variant="link" className="pl-0" onClick={toggleDescription}>
          {fulldescription ? "Show less" : "Show more"}
        </Button>
      )}
    </article>
  );
};

export default PropertiesDescription;
