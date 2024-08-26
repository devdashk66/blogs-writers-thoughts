import { auth } from "@/auth";
import BlogForm from "@/components/common/BlogForm";
import { getBlogById } from "@/database/queries";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  try {
    return {
      title: "Edit Blog | Blogs",
      // openGraph: {
      //   images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?text=${params.id}`,
      // },
    };
  } catch (error) {
    console.error("Error generating metadeta:", error);
  }
}

const BlogEditPage = async ({ params: { id } }) => {
  const blog = await getBlogById(id);
  const session = await auth();

  if (!blog || session?.user?.email !== blog?.author?.email) {
    notFound();
    return null;
  }

  return <BlogForm blog={blog} />;
};

export default BlogEditPage;
