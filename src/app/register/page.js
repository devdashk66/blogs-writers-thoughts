import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import RegisterForm from "./RegisterForm";

const RegisterPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/profile");
  }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#181818] text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-dark shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold dark:text-gray-100">
              Sign up
            </h1>
            <RegisterForm />
            <p className="mt-6 text-xs text-gray-600 text-center">
              Allready have an account?{" "}
              <Link
                href="/login"
                className="border-b border-gray-400 dark:text-gray-400 text-gray-800 border-dotted hover:text-primary duration-200 hover:border-b-primary"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("images/register.svg")',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
