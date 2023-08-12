import { cloudinaryConfig } from "@utils/config";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import React, { ReactNode } from "react";

interface ImagePropsComponent extends NextImageProps {
  src: string;
  alt: string;
  raw?: boolean;
  children?: ReactNode;
}

const ImageComponent: React.FC<ImagePropsComponent> = ({
  raw,
  src,
  alt,
  children,
  ...restProps
}) => {
  const source = raw ? src : cloudinaryConfig.baseDeliveryUrl + src;

  return <NextImage src={source} alt={alt} {...restProps} />;
};

export default ImageComponent;
