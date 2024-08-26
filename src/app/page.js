import CreateBlogForm from "@/components/common/CreateBlogForm";
import FavoriteBlogs from "./_component/FavoriteBlogs";
import PublicBlogs from "./_component/PublicBlogs";
import RecentBlogs from "./_component/RecentBlogs";

export default function Home() {
  return (
    <section className="bg-gray-100 dark:bg-[#181818] pt-5">
      <main className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row">
        <div className="lg:basis-9/12">
          {/* Form to create a new blog */}
          <CreateBlogForm />
          {/* Display public blogs */}
          <PublicBlogs />
        </div>
        <div className="h-auto lg:basis-3/12 bg-white dark:bg-dark p-5 rounded-md mt-5 lg:mt-0 mx-5 lg:ml-0">
          {/* Display recent blogs */}
          <RecentBlogs />
          {/* Display favorite blogs */}
          <FavoriteBlogs />
        </div>
      </main>
    </section>
  );
}
