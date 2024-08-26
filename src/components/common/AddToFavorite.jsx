"use client";

import { handleFavorite } from "@/database/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const AddToFavorite = ({ blogId, userId, isFavorite }) => {
  const [favorite, setFavorite] = useState(!!isFavorite);
  const router = useRouter();

  const addRemove = async () => {
    try {
      const result = await handleFavorite(blogId, userId);

      if (result === "User not found") {
        router.push("/login");
        toast.error("Login to add favorites");
      } else {
        router.refresh();
        setFavorite(!favorite);
        toast.success(result);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <button
      title={favorite ? "Remove form favorite" : "Add to favorite"}
      className={`h-9 rounded-full text-sm font-semibold px-3 focus:outline-none bg-slate-100   hover:text-white hover:bg-primary duration-200 ${
        favorite ? "text-primary" : "text-slate-700"
      }`}
      onClick={addRemove}
    >
      <FaHeart />
    </button>
  );
};

export default AddToFavorite;
