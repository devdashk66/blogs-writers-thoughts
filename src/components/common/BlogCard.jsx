import Image from "next/image";
import Link from "next/link";
import AddToFavorite from "./AddToFavorite";
import DeleteBlog from "./DeleteBlog";

// BlogCard component displays a single blog's details and allows certain user interactions
const BlogCard = ({ blog, user }) => {
  // Check if the current blog is in the user's favorites list
  const isFavorite = user?.favorites?.find((id) => id === blog.id);

  // Check if the current user is the author of the blog
  const isMe = user?.id === blog?.author?.id;

  return (
    <li className="relative flex flex-col sm:flex-row xl:flex-col items-start group">
      {/* Show delete option if the user is the author of the blog */}
      {isMe && <DeleteBlog id={blog?.id} />}

      <div className="order-1 sm:ml-6 xl:ml-0">
        {/* Display the author's name and link to their profile */}
        <h3 className="mb-1 text-slate-900 dark:text-slate-100 font-semibold">
          <Link
            href={`/profile/${blog?.author?.id}`}
            className="mb-1 inline-block text-sm leading-6 text-primary"
          >
            {blog?.author?.name}
          </Link>
        </h3>

        {/* Display the blog title and link to the full blog post */}
        <Link
          href={`/blog/${blog?.id}`}
          className="mb-1 xl:max-w-56 3xl:max-w-64 inline-block text-slate-900 dark:text-slate-100 font-semibold truncate"
        >
          {blog?.title}
        </Link>

        {/* Display a short description of the blog */}
        <div className="prose prose-slate prose-sm text-slate-600 dark:text-slate-300">
          <p>{blog?.description.slice(0, 70)}...</p>
        </div>

        {/* 'Learn more' button and 'Add to Favorite' functionality */}
        <div className="flex justify-between items-center mt-6">
          {/* Button to navigate to the full blog post */}
          <Link
            href={`/blog/${blog?.id}`}
            className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700  hover:text-white focus:ring-slate-500 hover:bg-primary duration-200"
          >
            Learn more
            <svg
              className="overflow-visible ml-3 text-slate-200 group-hover:text-white duration-300"
              width={3}
              height={6}
              viewBox="0 0 3 6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M0 0L3 3L0 6" />
            </svg>
          </Link>

          {/* Button to add or remove blog from favorites */}
          <AddToFavorite
            isFavorite={isFavorite}
            blogId={blog?.id}
            userId={user?.id}
          />
        </div>
      </div>

      {/* Display the blog image */}
      <div className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full overflow-hidden">
        <Image
          src={blog?.image ?? "/images/default-image.jpg"}
          alt={blog?.title ?? "Blog Image"}
          className="w-full h-full object-cover aspect-square rounded-lg group-hover:scale-125 duration-300"
          width={600}
          height={600}
        />
      </div>
    </li>
  );
};

export default BlogCard;
