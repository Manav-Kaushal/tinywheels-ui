import { GeneralApiProblem } from "@src/services/apiProblem";
import {
  ProductCategory,
  ProductCurrency,
  ProductScales,
} from "@utils/enums/Product";

export type CreateProduct = {
  title: string;
  slug: string;
  description: string;
  body: string;
  category: ProductCategory;
  brand: string;
  sku: string;
  scale: ProductScales;
  material: string;
  color: string;
  additionalColors: string;
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
  tags: string;
  isFeatured: boolean;
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
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

export type FetchBrandsRes =
  | GeneralApiProblem
  | {
      kind: "ok";
      data: any;
    };

export type CreateProductRes =
  | GeneralApiProblem
  | {
      kind: "ok";
    };

export type DeleteBrandsRes =
  | GeneralApiProblem
  | {
      kind: "ok";
    };
