import Image from "next/image";
import React from "react";

interface ImagesGridProps {
  images: string[];
}

const OneImageLayout = (images: string[]) => {
  return (
    <div className="relative w-full aspect-[3/1] max-h-[500px]">
      <Image
        src={images[0]}
        alt="product image"
        className="object-contain border rounded-lg shadow"
        fill
      />
    </div>
  );
};
const TwoImagesLayout = (images: string[]) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {images.map((image) => (
        <div
          key={image}
          className="relative w-full aspect-[1.5/1] max-h-[500px]"
        >
          <Image
            src={image}
            alt="product image"
            className="object-contain border rounded-lg shadow"
            fill
          />
        </div>
      ))}
    </div>
  );
};

const ImagesGrid: React.FC<ImagesGridProps> = ({ images }) => {
  const getGridLayout = () => {
    const length = images?.length;
    if (length === 0) {
      return null;
    }
    if (length === 1) {
      return OneImageLayout(images);
    }
    if (length === 2) {
      return TwoImagesLayout(images);
    }
  };

  return (
    <div>
      {getGridLayout()}
      {/* {images.map((imageUrl, index) => (
        <div key={index}>
          <img src={imageUrl} alt={`Image ${index}`} className="w-full" />
        </div>
      ))} */}
    </div>
  );
};

export default ImagesGrid;
