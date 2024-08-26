"use client";

import BlogList from "@/components/common/BlogList";
import { useState } from "react";
import FavouriteBlogs from "./FavouriteBlogs";

const Blogs = ({ myBlogs, favoriteBlogs, user }) => {
  const [show, setShow] = useState("blogs");

  const handleClick = (e) => {
    setShow(e.currentTarget.name);
  };

  return (
    <div className="mx-5 rounded-md text-xl">
      <div className="flex justify-evenly  mx-auto">
        <button
          onClick={handleClick}
          name="blogs"
          value="blogs"
          className={`basis-2/4 py-3 font-bold  rounded-md rounded-br-none rounded-bl-none   duration-200 ${
            show === "blogs"
              ? "bg-white dark:bg-dark text-primary"
              : "dark:text-gray-100 text-gray-700"
          }`}
        >
          Blogs
        </button>
        <button
          onClick={handleClick}
          name="favourites"
          value="favourites"
          className={`basis-2/4 py-3 font-bold rounded-md  rounded-bl-none rounded-br-none   duration-200 ${
            show === "favourites"
              ? "bg-white dark:bg-dark text-primary"
              : "dark:text-gray-100 text-gray-700"
          }`}
        >
          Favorites
        </button>
      </div>

      {show === "blogs" && <BlogList blogs={myBlogs} user={user} />}
      {show === "favourites" && (
        <FavouriteBlogs favoriteBlogs={favoriteBlogs} user={user} />
      )}
    </div>
  );
};

export default Blogs;
