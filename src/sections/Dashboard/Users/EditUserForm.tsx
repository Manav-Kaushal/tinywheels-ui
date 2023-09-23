import Button from "@components/Button";
import Input from "@components/Forms/Input";
import Select from "@components/Forms/Select";
import Spinner from "@components/Spinner";
// import api from "@src/services/api";
import { RolesEnum } from "@utils/enums/Roles";
import { UserType } from "@utils/types/User";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  token: string;
  userToEdit: UserType | null;
  callback: () => void;
};

const EditUserForm = ({ token, userToEdit, callback }: Props) => {
  const [initialValues, setInitialValues] = useState<UserType | null>(
    userToEdit
  );

  // const handleFormSubmit = async ({
  //   values,
  //   setSubmitting,
  // }: {
  //   values: any;
  //   setSubmitting: (isSubmitting: boolean) => void;
  // }) => {
  //   setSubmitting(true);

  //   const { name, role, isActive } = values;

  //   try {
  //     const payload = {
  //       name,
  //       role,
  //       isActive,
  //     };
  //     console.log(Boolean(isActive));

  //     const res: any = await api.put("/auth/" + userToEdit?._id, payload, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (res.ok) {
  //       toast.success("User updated successfully!");
  //       callback();
  //     } else {
  //       console.error({ res });
  //       toast.error(res?.data?.message || "User not updated!");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.1, type: "spring", stiffness: 150 }}
    >
      <Formik
        initialValues={initialValues as UserType}
        onSubmit={(values, { setSubmitting }) => {
          // handleFormSubmit({ values, setSubmitting });
        }}
        enableReinitialize
      >
        {({ values, isSubmitting }) => (
          <Form autoComplete="off" className="space-y-4">
            <Input name="email" label="Email" readOnly />
            <Input name="name" label="Name" />
            <Select
              name="role"
              label="Role"
              options={[
                { value: RolesEnum.ADMIN, label: "Admin" },
                { value: RolesEnum.DEVELOPER, label: "Developer" },
                { value: RolesEnum.TEAM, label: "Team" },
                { value: RolesEnum.CUSTOMER, label: "Customer" },
              ]}
            />
            <Select
              name="isActive"
              label="Is Active"
              options={[
                { value: true, label: "True" },
                { value: false, label: "False" },
              ]}
            />
            <Button
              size="sm"
              type="submit"
              label={isSubmitting ? <Spinner /> : "Update"}
              sx="ml-auto mt-4"
            />
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default EditUserForm;
