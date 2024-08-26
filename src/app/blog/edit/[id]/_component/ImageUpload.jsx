"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

const ImageUpload = ({ imagePreview, onUploadComplete }) => {
  const widgetOptions = {
    sources: ["local", "unsplash", "shutterstock"],
    resourceType: "image",
    cloudName: "dfwdo4jas",
    clientAllowedFormats: ["png", "jpg", "jpeg"],
    maxFiles: 1,
    multiple: false,
    folder: "user_blogs",
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
        <div className="relative mb-6 w-full h-64 dark:bg-zinc-900 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
          {imagePreview ? (
            <>
              {/* Display the image if it exists */}
              <Image
                width={1200}
                height={720}
                src={imagePreview}
                alt="Image preview"
                className="w-full h-full object-cover"
              />
              {/* "Change Image" button positioned at the top right */}
              <button
                type="button"
                onClick={open}
                className="absolute top-2 right-2 px-3 py-1 bg-primary text-white text-sm rounded-md"
              >
                Change Image
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              {/* Placeholder div when no image is present */}
              <button
                type="button"
                onClick={open}
                className="px-4 py-2 bg-primary text-white text-sm rounded-md"
              >
                Add Image
              </button>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
