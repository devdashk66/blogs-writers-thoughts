"use client";

import { deleteComment } from "@/database/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const DeleteCommentIcon = ({ id }) => {
  const router = useRouter(); // Initialize the router to programmatically navigate or refresh the page
  const [showModal, setShowModal] = useState(false); // State to manage the visibility of the confirmation modal

  // Function to handle comment deletion
  const handleDelete = async () => {
    try {
      // Call the deleteComment function from the database actions
      const res = await deleteComment(id);

      // If the deletion is successful, refresh the page to update the comments list
      if (res) {
        router.refresh();
        toast.success(res); // Show a success toast notification
      }
    } catch (error) {
      console.log(error); // Log any errors that occur during deletion
    } finally {
      setShowModal(false); // Close the confirmation modal after deletion attempt
    }
  };

  return (
    <>
      {/* Delete button to trigger the modal */}
      <button
        onClick={() => setShowModal(true)} // Show the modal on button click
        title="Delete Comment"
        className="absolute top-0 right-0 bg-primary rounded-bl-md w-7 h-7 text-white flex justify-center items-center z-10"
      >
        <MdDeleteOutline />
      </button>

      {/* Confirmation modal for deleting a comment */}
      {showModal && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100 text-gray-900">
              Are you sure you want to delete this comment?
            </h2>
            <div className="flex justify-end space-x-4">
              {/* Cancel button to close the modal */}
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-green-500 text-white rounded-md border border-green-500 hover:bg-transparent hover:text-green-500 duration-300"
              >
                Cancel
              </button>
              {/* Delete button to confirm deletion */}
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-primary border border-primary hover:bg-transparent hover:text-primary duration-300 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteCommentIcon;
