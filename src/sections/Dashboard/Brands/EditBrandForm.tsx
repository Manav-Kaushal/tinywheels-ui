import Button from "@components/Button";
import FileUploader from "@components/Forms/FileUploader";
import Input from "@components/Forms/Input";
import Spinner from "@components/Spinner";
import { api } from "@src/services/api";
import { Brand } from "@utils/types/Brands";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  brandToEdit: Brand | null;
  callback: () => void;
};

const EditBrandForm = ({ brandToEdit, callback }: Props) => {
  const [initialValues, setInitialValues] = useState<Brand | null>(null);

  const handleFormSubmit = async (
    values: Brand,
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
      formData.append("logo", logo);

      const res = await api.editBrand(brandToEdit?._id as string, formData);
      if (res.kind === "ok") {
        toast.success("Brand updated successfully!");
        callback();
      } else {
        toast.error("Brand not updated!");
      }
    } catch (error: any) {
      console.error(error?.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setInitialValues(brandToEdit);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.1, type: "spring", stiffness: 150 }}
    >
      <Formik
        initialValues={initialValues as Brand}
        onSubmit={(values, { setSubmitting }) => {
          handleFormSubmit(values, setSubmitting);
        }}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off" className="space-y-4">
            <Input name="name" label="Display Name" />
            <Input name="fullName" label="Full Name" />
            <div className="grid grid-cols-2 gap-4">
              <Input name="country" label="Country" />
              <Input name="yearFounded" label="Year Founded (MM-DD-YYYY)" />
            </div>
            <FileUploader
              name="logo"
              label="Update Logo"
              accept="image/*"
              imgSrc={initialValues?.logo}
            />
            <Button
              size="sm"
              type="submit"
              label={isSubmitting ? <Spinner /> : "Update"}
              sx="ml-auto"
            />
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default EditBrandForm;
