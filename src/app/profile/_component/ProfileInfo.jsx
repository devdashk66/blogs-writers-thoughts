"use client";
import Image from "next/image";
import { useState } from "react";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";
import Logout from "./Logout";

const ProfileInfo = ({ info, isPublic }) => {
  // State to handle edit mode for profile information
  const [editMode, setEditMode] = useState(false);

  // Function to close the edit profile modal
  const handleCloseModal = () => {
    setEditMode(false);
  };

  return (
    // Container for profile information with responsive design
    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto py-5">
      {/* Profile information section */}
      <div
        id="profile"
        className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white dark:bg-dark mx-6 lg:mx-0"
      >
        <div className="p-4 md:p-12 text-center lg:text-left">
          {/* Profile picture for smaller screens */}
          <div className="block border-x-4 border-primary lg:hidden rounded-full shadow-lg shadow-primary mx-auto  h-48 w-48 bg-cover bg-center overflow-hidden">
            <Image
              width={1200}
              height={1200}
              alt="profile"
              src={info?.profileUrl ?? "/images/default-avater.jpg"}
              className="w-full h-full object-cover"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
            />
          </div>

          {/* Display user's name */}
          <h1 className="text-3xl dark:text-white font-bold pt-8 lg:pt-0">
            {info?.name}
          </h1>

          {/* Divider line */}
          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-primary opacity-25" />

          {/* Job title section */}
          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start dark:text-gray-100">
            <FaBriefcase className="h-4 fill-current text-primary" />
            <span className="ml-4 block">{info.jobTitle ?? "N/A"}</span>
          </p>

          {/* Location section */}
          <p className="pt-2 text-gray-600 duration-300 dark:text-gray-100 text-xs lg:text-sm flex items-center justify-center lg:justify-start ">
            <FaMapMarkerAlt className="h-4 fill-current text-primary" />
            <span className="ml-4 block">{info.location ?? "N/A"}</span>
          </p>

          {/* Profile description */}
          <p className="pt-8 text-sm dark:text-gray-200">
            {info.description ?? "N/A"}
          </p>

          {/* Edit and logout buttons, shown only for non-public profiles */}
          {!isPublic && (
            <div className="pt-12 pb-8">
              <button
                onClick={() => setEditMode(true)}
                className="bg-primary text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg transform transition-all duration-300"
              >
                Edit Profile
              </button>
              <Logout />
            </div>
          )}
        </div>
      </div>

      {/* Larger screen profile picture */}
      <div className="w-full h-[70%] bg-primary bg-opacity-5 lg:w-2/5 rounded-lg flex items-center justify-center">
        <Image
          width={1920}
          height={1080}
          alt="profile"
          src={info?.profileUrl ?? "/images/default-avater.jpg"}
          className="w-full h-full bg-center object-cover rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
        />
      </div>

      {/* Modal for editing profile information */}
      {editMode && <EditProfileModal info={info} onClose={handleCloseModal} />}
    </div>
  );
};

export default ProfileInfo;
