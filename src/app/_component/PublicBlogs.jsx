import { auth } from "@/auth";
import BlogList from "@/components/common/BlogList";
import { getAllBlogs, getUserByEmail } from "@/database/queries";

const PublicBlogs = async () => {
  const session = await auth();
  const allBlogs = await getAllBlogs();
  const blogs = allBlogs.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const user = await getUserByEmail(session?.user?.email);
  return (
    <div className="mx-5">
      <BlogList blogs={blogs} user={user} />
    </div>
  );
};

export default PublicBlogs;
