import BlogCard from "./BlogCard";

// BlogList component is responsible for displaying a list of blogs
const BlogList = ({ blogs, user }) => {
  // Check if there are no blogs to display
  if (!blogs || blogs.length < 1) {
    return (
      <div className="py-28 bg-white dark:bg-dark rounded-md rounded-tl-none">
        <ul className="flex items-center justify-center p-5 mx-5 bg-white dark:bg-dark dark:text-gray-100 rounded-md text-center">
          <h2>
            No blogs available at the moment. Check back later for updates!
          </h2>
        </ul>
      </div>
    );
  }

  // Render the list of blogs
  return (
    <div className="py-6 bg-white dark:bg-dark rounded-md rounded-tl-none">
      <ul className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-y-10 gap-x-6 items-start p-5 mx-5 bg-white dark:bg-dark rounded-md">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
