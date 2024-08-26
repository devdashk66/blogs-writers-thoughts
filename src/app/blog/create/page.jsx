import BlogForm from "@/components/common/BlogForm";

export const metadata = {
  title: "Create new blog | Blogs", // Sets the title for the page
};

// Component to render the page
const CreateBlogpage = () => {
  return <BlogForm />; // Renders the BlogForm component for creating a new blog post
};

export default CreateBlogpage;
