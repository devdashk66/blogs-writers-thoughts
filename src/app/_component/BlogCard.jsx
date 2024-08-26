import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }) => {
  return (
    // Main container for the blog card with flex layout for alignment and spacing
    <div className="flex items-start mb-3 pb-3 group">
      <Link href={`/blog/${blog?.id}`} className="inline-block mr-3">
        <div className="w-16 h-16 bg-cover bg-center overflow-hidden rounded-md">
          {/* Image component from Next.js for optimized image loading */}
          <Image
            src={blog?.image ?? "/images/default-image.jpg"}
            width={150}
            height={90}
            alt={blog?.title ?? "Blog Image"}
            className="aspect-square object-cover rounded group-hover:scale-125 duration-300"
          />
        </div>
      </Link>

      {/* Container for text content (date and title) */}
      <div className="text-sm flex flex-col justify-between">
        <p className="text-gray-600 dark:text-gray-300 text-xs">
          {formatDate(blog?.createdAt)}
        </p>

        {/* Link to the blog post's detailed page */}
        <p>
          <Link
            href={`/blog/${blog?.id}`}
            className="text-gray-900 dark:text-gray-100 hover:text-primary duration-300 font-medium leading-none"
          >
            {blog?.title} {/* Blog post title */}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
