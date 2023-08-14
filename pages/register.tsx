import CirclesBackground from "@components/Backgrounds/CirclesBackground";
import Button from "@components/Button";
import Checkbox from "@components/Forms/Checkbox";
import Input from "@components/Forms/Input";
import Spinner from "@components/Spinner";
import api from "@utils/api";
import { appConfig } from "@utils/config";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {};

type FormikValuesType = {
  name: string;
  email: string;
  password: string;
  termsAndConditions: boolean;
};

const Login = (props: Props) => {
  const router = useRouter();
  const [signingUp, setSigningUp] = useState(false);

  const handleLogin = async (payload: FormikValuesType) => {
    setSigningUp(true);
    try {
      const { name, email, password } = payload;
      const body = {
        name,
        email,
        password,
      };

      const signupResponse: any = await api.post("/auth/signup", body, {
        headers: { "Content-Type": "application/json" },
      });
      console.log({ signupResponse });

      if (signupResponse.ok) {
        toast.success(
          "Congratulations! Your account has been successfully created."
        );

        const loginResponse: any = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: appConfig.websiteUrl,
        });

        if (loginResponse.ok) {
          toast.success("Login successful! Enjoy your experience.");
          router.push("/");
        } else {
          const errorMessage =
            loginResponse?.data?.message[0] ||
            loginResponse?.message ||
            "Something went wrong!";
          toast.error(errorMessage);
        }
      } else {
        const errorMessage =
          signupResponse?.data?.message ||
          signupResponse?.message ||
          "Something went wrong!";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setSigningUp(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full pt-16 overflow-hidden sm:py-28">
        <div className="flex flex-col w-full max-w-lg px-4 mx-auto sm:px-6">
          <div className="relative">
            <CirclesBackground
              width="1090"
              height="1090"
              className="absolute -top-7 left-1/2 -z-10 h-[700px] -translate-x-1/2 stroke-gray-300/50 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:-top-9 sm:h-auto"
            />
            <h1 className="text-3xl font-medium tracking-tight text-center text-gray-900">
              Create new account
            </h1>
            <p className="mt-3 text-base text-center text-gray-600">
              <>
                Already have an account?{" "}
                <Link href="/login" className="text-cyan-600">
                  Login
                </Link>{" "}
                to continue.
              </>
            </p>
          </div>
          <div className="flex-auto px-4 py-10 mt-6 -mx-4 bg-white shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-5xl sm:p-12">
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                termsAndConditions: false,
              }}
              onSubmit={(values) => {
                handleLogin(values);
              }}
            >
              {({ values }) => (
                <Form className="space-y-4">
                  <Input name="name" type="text" label="Name" required />
                  <Input name="email" type="email" label="Email" required />
                  <Input
                    name="password"
                    type="password"
                    label="Password"
                    required
                  />
                  <Checkbox
                    name="termsAndConditions"
                    label="I agree to the terms and conditions"
                  />
                  <Button
                    label={signingUp ? <Spinner /> : "Create Account"}
                    type="submit"
                    disabled={!values.termsAndConditions}
                    center
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
