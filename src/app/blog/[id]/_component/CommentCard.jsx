import { auth } from "@/auth";
import { getUserByEmail } from "@/database/queries";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

const CommentCard = async ({ comment, blogAuthorId }) => {
  const session = await auth(); // Retrieve the current session to check if a user is authenticated

  const loginUser = await getUserByEmail(session?.user?.email); // Fetch the logged-in user's details using their email from the session

  // Check if the logged-in user is the author of the comment
  const isCommentOwner = comment?.author?.id === loginUser?.id;

  // Check if the logged-in user is the owner of the blog associated with the comment
  const isBlogOwner = blogAuthorId === loginUser?.id;

  return (
    <div className="bg-white dark:bg-[#101010] p-4 rounded-lg shadow-md relative">
      {/* Link to the comment author's profile */}
      <Link
        href={`/profile/${comment?.author?.id}`}
        className="text-lg font-semibold hover:text-primary duration-300 hover:underline"
      >
        {comment?.author?.name}
      </Link>
      {/* Display the date the comment was posted */}
      <p className="text-gray-700 dark:text-gray-400 text-sm mb-2">
        Posted on {formatDate(comment?.createdAt)}
      </p>
      {/* Display the comment text */}
      <p className="text-gray-800 dark:text-gray-200">{comment?.comment}</p>
      {/* Display the delete button only if the logged-in user is the comment owner */}
      {/* {(isCommentOwner || isBlogOwner) && <DeleteComment id={comment?.id} />} */}
    </div>
  );
};

export default CommentCard;
