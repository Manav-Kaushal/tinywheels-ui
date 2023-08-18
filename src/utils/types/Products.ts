import {
  ProductCategory,
  ProductCurrency,
  ProductScales,
} from "@utils/enums/Product";

export type CreateProductTypes = {
  title: string;
  description: string;
  body: string;
  category: ProductCategory;
  brand: string;
  modelNumber: string;
  scale: ProductScales;
  material: string;
  color: string;
  price: number;
  currency: ProductCurrency;
  stockQuantity: number;
  images: File[];
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: {
    value: number;
    unit: string;
  };
  tags: string[];
  isFeatured: boolean;
};

export type ProductCategoryOption = {
  value: ProductCategory;
  label: string;
};

export type ProductScaleOption = {
  value: ProductScales;
  label: string;
};

export type ProductCurrencyOption = {
  value: ProductCurrency;
  label: string;
};
