import { replaceMongoIdInArray } from "@/utils/replaceMongoIdInArray ";
import { replaceMongoIdInObject } from "@/utils/replaceMongoIdInObject";
import connectToDB from "../connectToDB";
import { blogModel } from "../models/blogModel";
import { commentModel } from "../models/commentModel";
import { userModel } from "../models/userModel";

export const getUserByEmail = async (email) => {
  await connectToDB(); // Ensure this is called as a function

  try {
    const user = await userModel.findOne({ email }).select("-password").lean();

    if (user) {
      return replaceMongoIdInObject(user);
    } else {
      console.log("No user found with that email.");
      return null;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export const getAllUser = async () => {
  await connectToDB(); // Ensure this is called as a function

  try {
    const users = await userModel.find().lean();

    if (users) {
      return replaceMongoIdInArray(users);
    } else {
      console.log("No user found");
      return null;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getUserById = async (id) => {
  if (id.length !== 24) {
    console.error("Invalide user ID");
    return null;
  }
  await connectToDB();

  try {
    const user = await userModel
      .findOne({ _id: id })
      .select("-password")
      .lean();

    if (user) {
      return replaceMongoIdInObject(user);
    } else {
      console.log("No user found with that id.");
      return null;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getAllBlogs = async () => {
  await connectToDB();
  try {
    const blogs = await blogModel
      .find({})
      .populate({
        path: "author",
        model: userModel,
        select: "-password",
      })
      .lean();

    return replaceMongoIdInArray(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    throw new Error("Could not fetch blogs.");
  }
};

export const getBlogById = async (id) => {
  if (id.length !== 24) {
    console.error("Invalide blog ID");
    return null;
  }

  await connectToDB();

  try {
    const blog = await blogModel
      .findOne({ _id: id })
      .populate({
        path: "author",
        model: userModel,
        select: "-password",
      })
      .lean();

    if (blog) {
      return replaceMongoIdInObject(blog);
    } else {
      console.error("No blog found with that id.");
      return null;
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getBlogsByUserId = async (id) => {
  await connectToDB();

  if (id?.length !== 24) {
    return null;
  }

  try {
    const blogs = await blogModel
      .find({ author: id })
      .populate({
        path: "author",
        model: userModel,
        select: "-password",
      })
      .lean();

    if (blogs) {
      return blogs.map((blog) => replaceMongoIdInObject(blog));
    } else {
      console.error("No blog found with that id.");
      return null;
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export async function getFavoritesBlog(blogArray) {
  await connectToDB();

  try {
    // Ensure blogArray is an array and has elements
    if (!Array.isArray(blogArray) || blogArray.length === 0) {
      return null;
    }

    // Find all blogs with IDs in the blogArray
    const favoriteBlogs = await blogModel
      .find({
        _id: { $in: blogArray },
      })
      .populate({
        path: "author",
        model: userModel,
        select: "-password",
      })
      .lean();

    if (favoriteBlogs.length === 0) {
      console.log("No blogs found for the provided IDs");
      return null;
    }

    return replaceMongoIdInArray(favoriteBlogs);
  } catch (error) {
    throw new Error(`Error retrieving favorite blogs: ${error.message}`);
  }
}

export const getCommentByBlogId = async (id) => {
  if (id.length !== 24) {
    console.error("Invalide blog ID");
    return null;
  }

  await connectToDB();

  try {
    const comments = await commentModel
      .find({ blogId: id })
      .populate({
        path: "author",
        model: userModel,
        select: "-password",
      })
      .lean();

    if (comments) {
      return replaceMongoIdInArray(comments);
    } else {
      console.error("No blog found with that id.");
      return null;
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export async function getSearchResult(searchTerm) {
  await connectToDB();

  try {
    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i");
      const matchedBlogs = await blogModel
        .find({
          $or: [{ title: regex }, { description: regex }],
        })
        .populate({
          path: "author",
          model: userModel,
          select: "-password",
        })
        .lean();

      return replaceMongoIdInArray(matchedBlogs);
    }
  } catch (error) {
    console.error("Error fetching search results:", error.message || error);
    throw new Error("Could not fetch search results");
  }
}
