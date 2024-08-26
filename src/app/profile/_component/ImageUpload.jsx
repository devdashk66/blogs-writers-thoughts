"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";

const ImageUpload = ({ profileUrl, onUploadComplete }) => {
  const widgetOptions = {
    sources: ["local", "unsplash", "shutterstock"],
    resourceType: "image",
    cloudName: "dfwdo4jas",
    clientAllowedFormats: ["png", "jpg", "jpeg"],
    maxFiles: 1,
    multiple: false,
    folder: "user_profiles",
    cropping: false,
  };
  const handleUpload = (result, options) => {
    const imageUrl = result?.info?.secure_url;
    options.close();

    if (imageUrl) {
      onUploadComplete(imageUrl);
    }
  };

  return (
    <CldUploadWidget
      uploadPreset="p2nxrzqa_blogs"
      onSuccess={handleUpload}
      onError={(error) => console.error("Upload error:", error)}
      options={widgetOptions}
    >
      {({ open }) => (
        <div className="relative border-x-4 border-primary rounded-full border mx-auto h-48 w-48 bg-cover bg-center -mb-6">
          {profileUrl ? (
            <>
              <Image
                width={1200}
                height={1200}
                alt="profile"
                src={profileUrl}
                className="object-cover h-48 w-48 rounded-full"
              />
              <label
                className="absolute top-2 right-2 cursor-pointer"
                onClick={open}
              >
                <FaCamera className="text-4xl text-white bg-primary rounded-full p-1" />
              </label>
            </>
          ) : (
            <label
              className="flex items-center justify-center w-full h-full cursor-pointer"
              onClick={open}
            >
              <span className="text-gray-500 font-bold dark:text-gray-300">
                Add Photo
              </span>
            </label>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
