import { auth } from "@/auth";
import AddToFavorite from "@/components/common/AddToFavorite";
import DeleteBlog from "@/components/common/DeleteBlog";
import { getUserByEmail } from "@/database/queries";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const BlogInfo = async ({ blog }) => {
  // Authenticate the user and get the session
  const session = await auth();

  // Retrieve the user details by their email
  const user = await getUserByEmail(session?.user?.email);

  // Check if the current user is the author of the blog
  const isMe = blog?.author?.email === session?.user?.email;

  // Check if the blog is in the user's favorites list
  const isFavorite = user?.favorites?.find((id) => id === blog?.id);

  return (
    <>
      {/* Blog image section */}
      <div
        className="bg-cover bg-center text-center overflow-hidden relative"
        title={blog?.title}
      >
        <Image
          src={blog?.image ?? "/images/default-image.jpg"}
          width={1920}
          height={1080}
          alt={blog?.title}
          className="min-h-[300px] max-h-[500px] object-cover"
          placeholder="blur"
          blurDataURL={blog?.placeholder ?? "/images/placeholder.png"}
        />
        {/* Delete button for the blog, visible only if the user is the author */}
        {isMe && <DeleteBlog id={blog?.id} isBlogPage={true} />}
      </div>

      {/* Blog content section */}
      <div className="max-w-4xl mx-auto">
        <div className="mt-3 rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
          <div className="bg-white dark:bg-dark relative top-0 -mt-32 p-5 sm:p-10">
            {/* Edit button, visible only if the user is the author */}
            {isMe && (
              <Link
                href={`/blog/edit/${blog?.id}`}
                className="h-7 w-7 absolute top-0 right-0 bg-primary flex items-center justify-center text-white rounded-bl"
                title="Edit Blog"
              >
                <FaEdit />
              </Link>
            )}

            {/* Blog title */}
            <h1 className="text-gray-900 dark:text-gray-100 font-bold text-3xl mb-2">
              {blog?.title}
            </h1>

            {/* Author information and favorite button */}
            <div className="flex gap-5 items-center">
              <Link
                href={`/profile/${blog?.author?.id}`}
                className="border-2 border-primary rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow-md text-2xl text-white overflow-hidden"
              >
                <Image
                  src={blog?.author?.profileUrl ?? "/images/default-avater.jpg"}
                  width={200}
                  height={200}
                  alt={blog?.author?.name ?? "Avater"}
                  className="w-full h-full object-cover"
                />
              </Link>

              {/* Display blog post date and author */}
              <div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Posted on {formatDate(blog?.createdAt)}
                </p>
                <p className="text-gray-700 dark:text-gray-400 text-xs mt-2">
                  Written By:{" "}
                  <Link
                    href={`/profile/${blog?.author?.id}`}
                    className="text-primary font-medium transition duration-500 ease-in-out hover:border-b hover:border-primary"
                  >
                    {blog?.author?.name}
                  </Link>{" "}
                </p>
              </div>

              {/* Button to add or remove blog from favorites */}
              <AddToFavorite
                blogId={blog?.id}
                userId={user?.id}
                isFavorite={isFavorite}
              />
            </div>

            {/* Blog description */}
            <p className="text-base leading-8 my-5 dark:text-gray-300">
              {blog?.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogInfo;
