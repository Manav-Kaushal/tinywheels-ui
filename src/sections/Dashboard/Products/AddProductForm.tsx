import Input from "@components/Forms/Input";
import Select from "@components/Forms/Select";
import Switch from "@components/Switch";
import {
  ProductCategory,
  ProductCurrency,
  ProductScales,
} from "@utils/enums/Product";
import {
  CreateProductTypes,
  ProductCategoryOption,
  ProductCurrencyOption,
  ProductScaleOption,
} from "@utils/types/Products";
import { Form, Formik } from "formik";

type Props = {
  token: string;
  fetchAllProducts: () => void;
};

const initialValues: CreateProductTypes = {
  title: "",
  description: "",
  body: "",
  category: ProductCategory.SEDAN,
  brand: "",
  modelNumber: "",
  scale: ProductScales.ONETOTWELVE,
  material: "",
  color: "",
  price: 0,
  currency: ProductCurrency.INDIANRUPEE,
  stockQuantity: 50,
  images: [],
  dimensions: {
    length: 0,
    width: 0,
    height: 0,
  },
  weight: {
    value: 0,
    unit: "g",
  },
  tags: [],
  isFeatured: false,
};

const AddProductForm = ({ token, fetchAllProducts }: Props) => {
  const handleCreateProduct = (values: CreateProductTypes) => {};

  // Convert enum to category object
  const productCategoryOptions: ProductCategoryOption[] = Object.keys(
    ProductCategory
  ).map((key) => ({
    value: ProductCategory[key as keyof typeof ProductCategory],
    label: ProductCategory[key as keyof typeof ProductCategory],
  }));

  // Convert enum to scales object
  const productScaleOptions: ProductScaleOption[] = Object.keys(
    ProductScales
  ).map((key) => ({
    value: ProductScales[key as keyof typeof ProductScales],
    label: ProductScales[key as keyof typeof ProductScales],
  }));

  // Convert enum to currency object
  const productCurrencyOptions: ProductCurrencyOption[] = Object.keys(
    ProductCurrency
  ).map((key) => ({
    value: ProductCurrency[key as keyof typeof ProductCurrency],
    label: ProductCurrency[key as keyof typeof ProductCurrency],
  }));

  return (
    <div className="mt-8">
      <Formik
        initialValues={initialValues}
        onSubmit={(values: CreateProductTypes) => {
          handleCreateProduct(values);
        }}
        enableReinitialize
      >
        {({ values }) => (
          <Form className="space-y-4">
            <Input name="title" label="Title" />
            <Input name="description" label="Description" rows={2} />
            <Input name="body" label="Body" rows={5} />
            <Select
              name="category"
              label="Category"
              options={productCategoryOptions}
            />
            <Select name="scale" label="Scale" options={productScaleOptions} />
            <Input name="material" label="Material" />
            <Input name="color" label="Color" />
            <Switch name="isFeatured" label="Is Featured?" />
            <Select
              name="currency"
              label="Currency"
              options={productCurrencyOptions}
            />
            <Input name="stockQuantity" label="Stock" type="number" />
            <Input name="dimensions[length]" label="Length" type="number" />
            <Input name="dimensions[width]" label="Width" type="number" />
            <Input name="dimensions[height]" label="Height" type="number" />
            <Input name="weight[value]" label="Value" type="number" />
            <Input name="weight[unit]" label="Unit" />
            <pre>{JSON.stringify(values, undefined, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;
