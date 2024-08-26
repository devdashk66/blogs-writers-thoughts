import { auth } from "@/auth";
import { getFavoritesBlog, getUserByEmail } from "@/database/queries";
import BlogCard from "./BlogCard";

const FavoriteBlogs = async () => {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  const favoritesBlogs = await getFavoritesBlog(user?.favorites);
  if (!favoritesBlogs) {
    return null;
  }
  return (
    <section className="mt-5">
      <h2 className="text-2xl mb-5 font-bold text-gray-700 dark:text-gray-100">
        Favorite Blogs
      </h2>
      <div className="grid">
        {favoritesBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default FavoriteBlogs;
