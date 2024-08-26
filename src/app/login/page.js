import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "./_component/LoginForm";
import SocialLogin from "./_component/SocialLogin";

const LoginPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/profile");
  }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#181818] text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-dark shadow sm:rounded-lg flex justify-center flex-row-reverse flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold dark:text-gray-100">
              Login
            </h1>
            <div className="w-full flex-1 mt-8">
              <SocialLogin />
              <div className="my-8 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white dark:bg-primary dark:text-white p-1 rounded transform translate-y-1/2">
                  Or login with e-mail
                </div>
              </div>
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full scale-125 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/images/login.png")',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
