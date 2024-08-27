"use client";

import ImageUpload from "@/app/blog/edit/[id]/_component/ImageUpload";
import { createBlog, updateBlog } from "@/database/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const BlogForm = ({ blog }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // State for managing the image preview and form data
  const [imagePreview, setImagePreview] = useState(blog?.image || "");
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    description: blog?.description || "",
    image: blog?.image || "",
    id: blog?.id,
  });

  // Function to handle image upload and set image data
  const handleImageUpload = (imageUrl) => {
    setFormData({ ...formData, image: imageUrl });
    setImagePreview(imageUrl);
  };

  // Function to handle input changes for title and description fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if an image is uploaded
    if (!formData.image) {
      toast.error("Image is required.");
      return;
    }

    // Check if a title is provided
    if (!formData.title.trim()) {
      toast.error("Title is required.");
      return;
    }

    // Check if a description is provided
    if (!formData.description.trim()) {
      toast.error("Description is required.");
      return;
    }

    // Update blog if it already exists
    if (blog) {
      try {
        const response = await updateBlog(formData);
        if (response) {
          toast.success("Blog updated");
          router.push(`/blog/${response}`);
        } else {
          toast.error("Failed to update blog.");
        }
      } catch (error) {
        console.error("Error saving blog:", error);
        toast.error("An error occurred while updating the blog.");
      }
    } else {
      // Create a new blog
      try {
        const response = await createBlog(formData);
        if (response) {
          toast.success("Blog successfully created!");
          router.push(`/blog/${response}`);
        } else {
          toast.error("Failed to create blog.");
        }
      } catch (error) {
        console.error("Error saving blog:", error);
        toast.error("An error occurred while creating the blog.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-zinc-900 pt-5">
      <div className="max-w-3xl mx-auto p-5 rounded-md bg-white dark:bg-dark">
        {/* Image upload component */}
        <ImageUpload
          imagePreview={imagePreview}
          onUploadComplete={handleImageUpload}
        />

        {/* Blog form */}
        <form onSubmit={handleSubmit}>
          {/* Title input field */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-800 dark:text-gray-100 mb-1"
            >
              Title
            </label>
            <input
              autoFocus={true}
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-2 border dark:bg-zinc-900 bg-gray-100 text-gray-800 dark:text-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-primary"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          {/* Description input field */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-800 dark:text-gray-100 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full px-4 py-2 bg-gray-100 dark:bg-zinc-900 border border-gray-300 text-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:border-primary"
              rows={6}
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-end">
            <button
              disabled={loading}
              type="submit"
              className={` py-2  text-white font-semibold rounded-md focus:outline-none ${
                loading ? "border border-primary px-10" : "bg-primary px-6"
              }`}
            >
              {loading ? (
                <Image
                  src="/images/Spinner.svg"
                  width={25}
                  height={25}
                  alt="Loading"
                  property=""
                />
              ) : (
                <span>{blog ? "Update" : "Submit"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BlogForm;
