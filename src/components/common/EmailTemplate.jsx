import Link from "next/link";

const EmailTemplate = ({ name = "Name", success }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900  dark:bg-gray-100 bg-opacity-30 dark:bg-opacity-30">
      <div className="bg-white dark:bg-dark rounded-lg shadow-md p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Thank You! <span className="text-primary">{name}</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {success
            ? "Thanks for contacting us!. Please check your email for further information."
            : "Your message has been successfully sent. We will get back to you soon!"}
        </p>
        {success ? (
          <Link
            href="/"
            className="inline-block px-6 py-3 text-white bg-primary rounded-md hover:bg-opacity-90 transition-colors duration-300"
          >
            Back to Home
          </Link>
        ) : (
          <a
            href="https://blogs-writers-thoughts.vercel.app/"
            className="inline-block px-6 py-3 text-white bg-primary rounded-md hover:bg-opacity-90 transition-colors duration-300"
          >
            Back to Home
          </a>
        )}
      </div>
    </div>
  );
};

export default EmailTemplate;
