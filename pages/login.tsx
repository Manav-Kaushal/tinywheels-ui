import CirclesBackground from "@components/Backgrounds/CirclesBackground";
import Button from "@components/Button";
import Input from "@components/Forms/Input";
import Spinner from "@components/Spinner";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async (payload: { email: string; password: string }) => {
    setLoggingIn(true);
    const { email, password } = payload;

    try {
      const response: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (response.ok) {
        toast.success("Login successful! Enjoy your experience.");
        router.push("/");
      } else {
        toast.error(
          response?.error || response?.message || "Something went wrong!"
        );
        console.error({ response });
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full pt-16 overflow-hidden sm:py-28">
        <div className="flex flex-col w-full max-w-lg px-4 mx-auto sm:px-6">
          <div className="relative mt-12 sm:mt-16">
            <CirclesBackground
              width="1090"
              height="1090"
              className="absolute -top-7 left-1/2 -z-10 h-[788px] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:-top-9 sm:h-auto"
            />
            <h1 className="text-2xl font-medium tracking-tight text-center text-gray-900">
              Sign in to account
            </h1>
            <p className="mt-3 text-lg text-center text-gray-600">
              <>
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-cyan-600">
                  Sign up
                </Link>{" "}
                for a free trial.
              </>
            </p>
          </div>
          <div className="flex-auto px-4 py-10 mt-10 -mx-4 bg-white shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-5xl sm:p-12">
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => {
                handleLogin(values);
              }}
            >
              <Form className="space-y-4">
                <Input name="email" type="email" label="Email" required />
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  required
                />
                <Button
                  label={loggingIn ? <Spinner /> : "Sign In"}
                  type="submit"
                  center
                />
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
