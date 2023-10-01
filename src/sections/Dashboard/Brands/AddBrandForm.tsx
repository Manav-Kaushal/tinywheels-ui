import Button from "@components/Button";
import FileUploader from "@components/Forms/FileUploader";
import Input from "@components/Forms/Input";
import Spinner from "@components/Spinner";
import { api } from "@src/services/api";
import { Overlay } from "@utils/types/Brands";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";

type Props = {
  toggle: (type: Overlay, callback?: () => void) => void;
  fetchBrands: () => Promise<void>;
};

type InitialValues = {
  name: string;
  fullName: string;
  country: string;
  yearFounded: string;
  logo: string | Blob | null;
};

const AddBrandForm = ({ toggle, fetchBrands }: Props) => {
  const initialValues = {
    name: "",
    fullName: "",
    country: "",
    yearFounded: "",
    logo: null,
  };

  const handleFormSubmit = async (
    values: InitialValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);
    try {
      const { name, fullName, country, yearFounded, logo } = values;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("fullName", fullName);
      formData.append("country", country);
      formData.append("yearFounded", yearFounded);
      formData.append("logo", logo as Blob);
      const res = await api.createBrand(formData);
      if (res.kind === "ok") {
        toast.success("Brand created!");
        toggle("modal");
        fetchBrands();
      } else {
        toast.error("Brand not created!");
      }
    } catch (error: any) {
      console.error(error?.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          handleFormSubmit(values as InitialValues, setSubmitting);
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form autoComplete="off" className="space-y-4">
            <Input name="name" label="Display Name" required />
            <Input name="fullName" label="Full Name" />
            <div className="grid grid-cols-2 gap-4">
              <Input name="country" label="Country" required />
              <Input
                name="yearFounded"
                label="Year Founded (MM-DD-YYYY)"
                required
              />
            </div>
            <FileUploader
              name="logo"
              label="Upload Logo"
              accept="image/*"
              required
            />
            <Button
              type="submit"
              size="sm"
              label={isSubmitting ? <Spinner /> : "Create"}
              sx="ml-auto"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBrandForm;
