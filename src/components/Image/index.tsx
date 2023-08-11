import { cloudinaryConfig } from "@utils/config";
import classNames from "classnames";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import React, { ReactNode } from "react";

interface ImagePropsComponent extends NextImageProps {
  src: string;
  alt: string;
  raw?: boolean;
  sx?: string;
  children?: ReactNode;
}

const ImageComponent: React.FC<ImagePropsComponent> = ({
  raw,
  src,
  alt,
  sx,
  children,
  ...restProps
}) => {
  const source = raw ? src : cloudinaryConfig.baseDeliveryUrl + src;

  return (
    <NextImage
      src={source}
      alt={alt}
      className={classNames(sx)}
      {...restProps}
    />
  );
};

export default ImageComponent;
