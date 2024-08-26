import { auth } from "@/auth";
import BlogList from "@/components/common/BlogList";
import {
  getAllUser,
  getBlogsByUserId,
  getUserByEmail,
  getUserById,
} from "@/database/queries";
import { notFound, redirect } from "next/navigation";
import ProfileInfo from "../_component/ProfileInfo";

export async function generateMetadata({ params, searchParams }, parent) {
  const id = decodeURIComponent(params.id);
  const user = await getUserById(id);

  const title = !!user ? `${user?.name}'s Profile` : `Page not found | Blogs`;

  try {
    return {
      title,
      // openGraph: {
      //   images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?text=${params.id}`,
      // },
    };
  } catch (error) {
    console.error("Error generating metadeta:", error);
  }
}

export async function generateStaticParams() {
  const users = await getAllUser();
  const params = users?.map((user) => ({ id: user.id }));
  return params;
}

const PublicProfile = async ({ params: { id } }) => {
  const session = await auth();
  const loginUser = await getUserByEmail(session?.user?.email);
  const user = await getUserById(id);
  const blogs = await getBlogsByUserId(id);

  if (!user) {
    notFound();
    return null;
  }

  if (session?.user?.email === user?.email) {
    redirect(`/profile`);
  }
  return (
    <section className="font-sans antialiased bg-gray-100 dark:bg-[#181818] text-gray-900 leading-normal tracking-wider bg-cover">
      <ProfileInfo info={user} isPublic={true} />
      <div className="mx-6">
        <h2 className="pt-6 px-10 text-2xl font-bold bg-white dark:text-gray-100 dark:bg-dark border-b border-primary pb-2">
          {user?.name}&#39;s blogs
        </h2>
        <BlogList blogs={blogs} user={loginUser} />
      </div>
    </section>
  );
};

export default PublicProfile;
