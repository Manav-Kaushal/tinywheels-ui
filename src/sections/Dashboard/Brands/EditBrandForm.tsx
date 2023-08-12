import Button from "@components/Button";
import FileUploader from "@components/Forms/FileUploader";
import Input from "@components/Forms/Input";
import Loader from "@components/Loader";
import Spinner from "@components/Spinner";
import api from "@utils/api";
import { BrandType } from "@utils/types/Brand";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  id: string;
  token: string;
  callback: () => void;
};

const EditBrandForm = ({ id, token, callback }: Props) => {
  const [fetchingBrandDetails, setFetchingBrandDetails] =
    useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<BrandType | null>(null);

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
      formData.append("logo", logo);

      const res = await api.put("/brands/" + id, formData, {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.ok) {
        toast.success("Brand updated successfully!");
        callback();
      } else {
        toast.error("Brand not updated!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchSingleBrandDetails = async () => {
    if (id) {
      try {
        const res = await api.get(`/brands/${id}`);
        const brand: BrandType = res.data as BrandType;
        setInitialValues({
          name: brand.name,
          fullName: brand.fullName,
          country: brand.country,
          yearFounded: brand.yearFounded,
          logo: brand.logo,
        } as any);
      } catch (error) {
        console.error("Error fetching brand details:", error);
        toast.error("An error occurred while fetching brand details.");
      } finally {
        setFetchingBrandDetails(false);
      }
    }
  };

  useEffect(() => {
    fetchSingleBrandDetails();
  }, []);

  if (fetchingBrandDetails) {
    return (
      <div className="flex items-center justify-center w-full min-h-[calc(100vh-140px)]">
        <Loader />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.1, type: "spring", stiffness: 150 }}
    >
      <Formik
        initialValues={initialValues as BrandType}
        onSubmit={(values, { setSubmitting }) => {
          handleFormSubmit({ values, setSubmitting });
        }}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off" className="space-y-4">
            <Input name="name" label="Display Name" />
            <Input name="fullName" label="Full Name" />
            <div className="grid grid-cols-2 gap-4">
              <Input name="country" label="Country" />
              <Input name="yearFounded" label="Year Founded" />
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
