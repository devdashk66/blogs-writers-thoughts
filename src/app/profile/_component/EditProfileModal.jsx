"use client";
import ImageUpload from "@/app/profile/_component/ImageUpload";
import { useUser } from "@/context/UserContext";
import { updateUser } from "@/database/actions";
import { useState } from "react";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const EditProfileModal = ({ info, onClose }) => {
  const { setContextUser } = useUser();
  const [user, setUser] = useState({
    profileUrl: info.profileUrl || "",
    name: info.name,
    jobTitle: info.jobTitle,
    location: info.location,
    description: info.description,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleImageUpload = (imageUrl) => {
    setUser({ ...user, profileUrl: imageUrl });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedUser = await updateUser(info.id, user);
      if (updatedUser) {
        setContextUser(updatedUser);
        onClose();
        toast.success("Profile Updated");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="w-screen h-screen top-0 left-0 bg-black dark:bg-white bg-opacity-30 dark:bg-opacity-30 fixed flex items-center justify-center z-50">
      <div className="relative md:max-w-[768px] bg-white dark:bg-dark w-full h-screen md:rounded-lg flex items-center flex-col justify-center mr-4">
        <button onClick={onClose} className="absolute top-1 right-1">
          <IoClose className="text-3xl text-primary" />
        </button>
        <ImageUpload
          onUploadComplete={handleImageUpload}
          profileUrl={user?.profileUrl}
        />
        <form onSubmit={handleSubmit}>
          <div className="p-4 text-center lg:text-left">
            <input
              onChange={handleChange}
              className="text-2xl dark:text-white font-bold border focus:border-primary dark:bg-zinc-900 duration-300 outline-none rounded px-3 py-2 mt-8 w-full text-center"
              type="text"
              name="name"
              placeholder="Your Name"
              value={user.name}
              required
            />
            <p className="pt-4 text-base flex items-center justify-center lg:justify-start dark:text-gray-100">
              <FaBriefcase className="text-2xl fill-current text-primary" />
              <input
                onChange={handleChange}
                className="ml-4 w-full border focus:border-primary dark:bg-zinc-900 duration-300 outline-none rounded px-3 py-2"
                type="text"
                name="jobTitle"
                placeholder="Your job title"
                value={user.jobTitle || ""}
              />
            </p>
            <p className="pt-4 text-base flex items-center justify-center lg:justify-start dark:text-gray-100">
              <FaMapMarkerAlt className="text-2xl fill-current text-primary" />
              <input
                onChange={handleChange}
                className="ml-4 w-full border focus:border-primary dark:bg-zinc-900 duration-300 outline-none rounded px-3 py-2"
                type="text"
                name="location"
                placeholder="Your location"
                value={user.location || ""}
              />
            </p>

            <p className="pt-8 text-sm dark:text-gray-200">
              <textarea
                onChange={handleChange}
                className="border focus:border-primary dark:bg-zinc-900 duration-300 outline-none rounded px-3 py-2"
                cols={50}
                rows={5}
                type="text"
                name="description"
                placeholder="Short description about yourself"
                value={user.description || ""}
              />
            </p>
            <div className="pt-8 pb-6">
              <button className="bg-primary text-white font-bold py-2 px-8 rounded-full border border-primary hover:border transform transition-all duration-300">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfileModal;
