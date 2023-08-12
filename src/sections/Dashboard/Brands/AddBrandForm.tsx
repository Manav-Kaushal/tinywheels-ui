import Button from "@components/Button";
import FileUploader from "@components/Forms/FileUploader";
import Input from "@components/Forms/Input";
import Spinner from "@components/Spinner";
import api from "@utils/api";
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";

type Props = {
  token: string;
  fetchAllBrands: () => void;
  toggleAddBrandModal: (show: boolean, callback?: () => void) => void;
};

const AddBrandForm = ({
  token,
  fetchAllBrands,
  toggleAddBrandModal,
}: Props) => {
  const initialValues = {
    name: "",
    fullName: "",
    country: "",
    yearFounded: "",
    logo: null,
  };

  const handleFormSubmit = async ({
    values,
    setSubmitting,
  }: {
    values: any;
    setSubmitting: (isSubmitting: boolean) => void;
  }) => {
    setSubmitting(true);

    const { name, fullName, country, yearFounded, logo } = values;

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("fullName", fullName);
      formData.append("country", country);
      formData.append("yearFounded", yearFounded);
      formData.append("logo", logo[0]);

      const res = await api.post("/brands/new", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.ok) {
        toast.success("Brand created successfully!");
        toggleAddBrandModal(false);
        fetchAllBrands();
      } else {
        toast.error("Brand not created!");
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          handleFormSubmit({ values, setSubmitting });
        }}
      >
        {({ values, isSubmitting }) => (
          <Form autoComplete="off" className="space-y-4">
            <Input name="name" label="Display Name" required />
            <Input name="fullName" label="Full Name" />
            <div className="grid grid-cols-2 gap-4">
              <Input name="country" label="Country" required />
              <Input name="yearFounded" label="Year Founded" required />
            </div>
            <FileUploader name="logo" label="Logo" accept="image/*" required />
            <Button label={isSubmitting ? <Spinner /> : "Submit"} center />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBrandForm;
