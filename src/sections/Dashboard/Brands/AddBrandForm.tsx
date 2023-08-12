import Input from "@components/Forms/Input";
import { Form, Formik } from "formik";

type Props = {
  fetchAllBrands: () => void;
  toggleAddBrandModal: (show: boolean, callback?: () => void) => void;
};

const AddBrandForm = ({ fetchAllBrands, toggleAddBrandModal }: Props) => {
  const initialValues = {
    name: "",
    fullName: "",
    country: "",
    yearFounded: "",
    logo: null,
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form autoComplete="off" className="space-y-4">
            <Input name="name" label="Display Name" />
            <Input name="fullName" label="Full Name" />
            <div className="grid grid-cols-2 gap-4">
              <Input name="country" label="Country" />
              <Input name="yearFounded" label="Year Founded" />
            </div>
            <pre>{JSON.stringify(values, undefined, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBrandForm;
