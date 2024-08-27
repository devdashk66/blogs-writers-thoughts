import { getAllBlogs, getBlogById } from "@/database/queries";
import { notFound } from "next/navigation";
import BlogComments from "./_component/BlogComments";
import BlogInfo from "./_component/BlogInfo";

export async function generateMetadata({ params, searchParams }, parent) {
  const id = decodeURIComponent(params.id);
  const blog = await getBlogById(id);

  // Construct the page title based on the blog's existence
  const title = blog
    ? `${blog?.title} by ${blog?.author?.name}`
    : `Page not found | Blogs`;

  try {
    return {
      title,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
  }
}

export async function generateStaticParams() {
  // Fetch all blogs to generate static paths
  const blogs = await getAllBlogs();
  const params = blogs?.map((blog) => ({ id: blog.id }));
  return params;
}

const BlogPage = async ({ params: { id } }) => {
  // Fetch the blog by ID
  const blog = await getBlogById(id);

  // If no blog is found, render the 404 page
  if (!blog) {
    notFound();
    return null;
  }

  return (
    // Main section for the blog page
    <section className="bg-gray-100 text-gray-900 dark:bg-[#181818] dark:text-gray-100">
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
        {/* Component to display blog information */}
        <BlogInfo blog={blog} />
        {/* Component to handle blog comments */}
        <BlogComments blog={blog} />
      </div>
    </section>
  );
};

export default BlogPage;
