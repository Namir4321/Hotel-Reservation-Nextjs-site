import Image from "next/image";

const ImageContainer = ({ mainimage, name }) => {
  return (
    <section className="h-[300px] md:h-[500px] relative mt-8">
      <Image
        src={mainimage}
        fill
        sizes="100vw"
        alt={name}
        className="object-cover rounded"
        priority
      />
     
    </section>
  );
};

export default ImageContainer;
