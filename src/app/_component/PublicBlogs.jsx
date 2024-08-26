import { auth } from "@/auth";
import BlogList from "@/components/common/BlogList";
import { getAllBlogs, getUserByEmail } from "@/database/queries";

const PublicBlogs = async () => {
  const session = await auth();
  const blogs = await getAllBlogs();
  const user = await getUserByEmail(session?.user?.email);
  return (
    <div className="mx-5">
      <BlogList blogs={blogs} user={user} />
    </div>
  );
};

export default PublicBlogs;
