import BlogList from "@/components/common/BlogList";

const FavouriteBlogs = ({ favoriteBlogs, user }) => {
  return (
    <>
      <BlogList blogs={favoriteBlogs} user={user} />
    </>
  );
};

export default FavouriteBlogs;
