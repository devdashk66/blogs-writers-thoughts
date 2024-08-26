import { getCommentByBlogId } from "@/database/queries";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

const BlogComments = async ({ blog }) => {
  // Fetch comments for the given blog ID
  const comments = await getCommentByBlogId(blog?.id);

  return (
    <div className="bg-white dark:bg-dark p-6 my-6">
      {/* Section header for comments */}
      <h2 className="text-lg font-bold mb-4">Comments</h2>

      <div className="flex flex-col space-y-4">
        {/* Render a list of CommentCard components for each comment */}
        {comments &&
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              blogAuthorId={blog?.author?.id}
            />
          ))}

        {/* Component for adding a new comment */}
        <CommentForm blogId={blog?.id} />
      </div>
    </div>
  );
};

export default BlogComments;
