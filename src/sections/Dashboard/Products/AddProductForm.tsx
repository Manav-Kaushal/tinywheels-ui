import Accordion from "@components/Accordion";
import Button from "@components/Button";
import Divider from "@components/Divider";
import Input from "@components/Forms/Input";
import Select from "@components/Forms/Select";
import Switch from "@components/Switch";
import {
  ProductCategory,
  ProductCurrency,
  ProductScales,
} from "@utils/enums/Product";
import { slugifyProductName } from "@utils/helpers";
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
  slug: "",
  description: "",
  body: "",
  category: ProductCategory.SEDAN,
  brand: "",
  sku: "",
  scale: ProductScales.ONETOTWELVE,
  material: "",
  color: "",
  additionalColors: "",
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
  tags: "",
  isFeatured: false,
  meta: {
    title: "",
    description: "",
    keywords: "",
  },
};

const AddProductForm = ({ token, fetchAllProducts }: Props) => {
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

  const handleCreateProduct = (values: CreateProductTypes) => {
    console.log(values);
  };

  return (
    <div className="mt-6">
      <Formik
        initialValues={initialValues}
        onSubmit={(values: CreateProductTypes) => {
          handleCreateProduct(values);
        }}
        enableReinitialize
      >
        {({ values, setFieldValue, resetForm }) => (
          <Form className="space-y-2" autoComplete="off">
            <Accordion title="Product Details" defaultOpen>
              <div className="grid grid-cols-12 gap-6">
                <Input
                  name="title"
                  label="Title"
                  onBlurCapture={(e) => {
                    const title = e.target.value;
                    if (title) {
                      const slug = slugifyProductName(title);
                      setFieldValue("slug", slug);
                    }
                  }}
                  containerClassName="col-span-6"
                />
                <Input
                  name="slug"
                  label="Slug"
                  containerClassName="col-span-6"
                />
                <Input
                  name="description"
                  label="Description"
                  rows={2}
                  containerClassName="col-span-12"
                />
                <Input
                  name="body"
                  label="Body"
                  rows={5}
                  containerClassName="col-span-12"
                />
                <Input
                  name="tags"
                  label="Tags"
                  containerClassName="col-span-5"
                />
                <Input name="sku" label="SKU" containerClassName="col-span-5" />
                <div className="col-span-5">
                  <Switch name="isFeatured" label="Is Featured?" />
                </div>
                <Divider label="Properties" sx="col-span-12 my-4" />
                <Input
                  name="price"
                  label="Price"
                  type="number"
                  containerClassName="col-span-3"
                />
                <Select
                  name="currency"
                  label="Currency"
                  options={productCurrencyOptions}
                  containerClassName="col-span-3"
                />
                <Input
                  name="stockQuantity"
                  label="Stock"
                  type="number"
                  containerClassName="col-span-3"
                />
                <Select
                  name="category"
                  label="Category"
                  options={productCategoryOptions}
                  containerClassName="col-span-3"
                />
                <Select
                  name="scale"
                  label="Scale"
                  options={productScaleOptions}
                  containerClassName="col-span-3"
                />
                <Input
                  name="material"
                  label="Material"
                  containerClassName="col-span-3"
                />
                <Input
                  name="color"
                  label="Color"
                  containerClassName="col-span-3"
                />
                <Input
                  name="additionalColors"
                  label="Additional Colors"
                  containerClassName="col-span-3"
                />
                <Divider label="Dimensions" sx="col-span-12 my-4" />
                <Input
                  name="dimensions[length]"
                  label="Length (cm)"
                  type="number"
                  containerClassName="col-span-4"
                />
                <Input
                  name="dimensions[width]"
                  label="Width (cm)"
                  type="number"
                  containerClassName="col-span-4"
                />
                <Input
                  name="dimensions[height]"
                  label="Height (cm)"
                  type="number"
                  containerClassName="col-span-4"
                />
                <Divider label="Weight" sx="col-span-12 my-4" />
                <Input
                  name="weight[value]"
                  label="Value"
                  type="number"
                  containerClassName="col-span-6"
                />
                <Input
                  name="weight[unit]"
                  label="Unit"
                  containerClassName="col-span-6"
                />
              </div>
            </Accordion>

            <Accordion title="Meta Information">
              <div className="grid grid-cols-12 gap-6">
                <Input
                  name="meta[title]"
                  label="Meta Title"
                  containerClassName="col-span-6"
                  maxLength={60}
                />
                <Input
                  name="meta[keywords]"
                  label="Meta Keywords"
                  containerClassName="col-span-6"
                  maxLength={60}
                />
                <Input
                  name="meta[description]"
                  label="Meta Description"
                  rows={2}
                  containerClassName="col-span-12"
                  maxLength={160}
                />
              </div>
            </Accordion>

            <Accordion title="Images">
              <div className="grid grid-cols-12 gap-6">Images</div>
            </Accordion>

            <div className="flex items-center justify-end space-x-2">
              <Button
                label="Reset"
                variant="danger"
                onClick={() => resetForm()}
              />
              <Button label="Create Product" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;
