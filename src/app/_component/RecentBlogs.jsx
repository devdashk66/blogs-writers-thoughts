import { getAllBlogs } from "@/database/queries";
import BlogCard from "./BlogCard";

const RecentBlogs = async () => {
  const blogs = await getAllBlogs();

  // Sort blogs by createdAt in descending order and take the top 5
  const recentBlogs = blogs
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <section>
      <h2 className="text-2xl mb-5 font-bold text-gray-700 dark:text-gray-100">
        Recent Blogs
      </h2>
      <div className="grid">
        {recentBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
