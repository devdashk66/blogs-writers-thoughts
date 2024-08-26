import { auth } from "@/auth";
import CreateBlogForm from "@/components/common/CreateBlogForm";
import {
  getBlogsByUserId,
  getFavoritesBlog,
  getUserByEmail,
} from "@/database/queries";
import { redirect } from "next/navigation";
import Blogs from "./_component/Blogs";
import ProfileInfo from "./_component/ProfileInfo";

export async function generateMetadata({ params, searchParams }, parent) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  const name = user?.name;
  const title = user?.jobTitle ? ` | ${user?.jobTitle}` : "";

  try {
    return {
      title: name + title,
      // openGraph: {
      //   images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?text=${params.id}`,
      // },
    };
  } catch (error) {
    console.error("Error generating metadeta:", error);
  }
}

const ProfilePage = async () => {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  const myBlogs = await getBlogsByUserId(user?.id);
  const favoriteBlogs = await getFavoritesBlog(user?.favorites);

  if (!session?.user) {
    redirect("/login");
  }
  return (
    <section className="font-sans antialiased bg-gray-100 dark:bg-[#181818] text-gray-900 leading-normal tracking-wider bg-cover">
      <ProfileInfo info={user} />
      <CreateBlogForm />
      <Blogs myBlogs={myBlogs} favoriteBlogs={favoriteBlogs} user={user} />
    </section>
  );
};

export default ProfilePage;
