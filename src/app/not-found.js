import Link from "next/link";

export const metadata = {
  title: "Page not found | Blogs",
  description: "The page you are looking for does not exist.",
  // openGraph: {
  //   images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?text=NotFound`,
  // },
};

export default function NotFound() {
  return (
    <section className="bg-gray-100 dark:bg-[#181818] pt-6">
      <div className="text-center py-48 flex items-center justify-center bg-white dark:bg-dark mx-6">
        <div>
          <h1 className="mb-4 text-6xl font-semibold text-primary">404</h1>
          <p className="mb-4 text-lg text-gray-600 dark:text-gray-200">
            Oops! Looks like you&#39;re lost.
          </p>
          <div className="animate-bounce">
            <svg
              className="mx-auto h-16 w-16 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-200">
            Let&#39;s get you back{" "}
            <Link href="/" className="text-primary font-bold">
              Home
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
