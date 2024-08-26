"use client";

import { useUser } from "@/context/UserContext";
import { addComment } from "@/database/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const CommentForm = ({ blogId }) => {
  const { user } = useUser(); // Get the current user from context
  const router = useRouter(); // Router instance to handle navigation

  // State variables for comment text and error messages
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const userId = user?.id; // Get user ID if logged in

    // Check if user is logged in; if not, redirect to login page
    if (!user) {
      router.push("/login");
      toast.error("Please log in to add a comment.");
    }

    // Validate comment input
    if (!comment) {
      setError("Comment cannot be empty."); // Set error if comment is empty
      return;
    }

    if (comment.length < 3) {
      setError("Comment must be at least 3 characters long."); // Set error if comment is too short
      return;
    }

    // If user is logged in, attempt to add comment
    if (user) {
      try {
        const data = await addComment(blogId, comment, userId); // Add comment to database

        if (data) {
          // Reset state if comment is successfully added
          setComment("");
          setError("");
          router.refresh(); // Refresh the page to show the new comment
          toast.success("Comment added"); // Show success notification
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to add comment. Please try again."); // Show error notification
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-[#101010] p-4 rounded-lg shadow-md"
    >
      {/* Comment form title */}
      <h3 className="text-lg font-bold mb-2">Add a comment</h3>

      <div className="mb-4">
        {/* Textarea for entering comment */}
        <label
          className="block text-gray-700 dark:text-gray-200 font-bold mb-2 sr-only"
          htmlFor="comment"
        >
          Comment
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none dark:bg-zinc-900 dark:text-white focus:border-primary duration-300"
          id="comment"
          name="comment"
          rows={3}
          placeholder="Enter your comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setError(""); // Clear error message when user starts typing
          }}
        />
        {/* Display error message if any */}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* Submit button */}
      <button
        className="bg-primary hover:bg-opacity-80 duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
