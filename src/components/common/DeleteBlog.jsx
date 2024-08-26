"use client";
import { deleteBlog } from "@/database/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const DeleteBlog = ({ id, isBlogPage }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await deleteBlog(id);
      if (res) {
        if (isBlogPage) {
          router.push("/profile");
        }
        router.refresh();
        toast.success(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowModal(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        title="Delete"
        className={`absolute top-0 right-0 bg-primary rounded-bl-md w-7 h-7 text-white flex justify-center items-center z-10  ${
          !isBlogPage && "rounded-tr-md"
        }`}
      >
        <MdDeleteOutline />
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100 text-gray-900">
              Are you sure you want to delete this blog?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-green-500 text-white rounded-md border border-green-500 hover:bg-transparent hover:text-green-500 duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-primary border border-primary hover:bg-transparent hover:text-primary duration-300 text-white rounded-md"
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

export default DeleteBlog;
