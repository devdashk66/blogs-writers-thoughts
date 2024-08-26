"use server";
import { auth, signIn } from "@/auth";
import EmailTemplate from "@/components/common/EmailTemplate";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import connectToDB from "../connectToDB";
import { blogModel } from "../models/blogModel";
import { commentModel } from "../models/commentModel";
import { userModel } from "../models/userModel";
import { getUserByEmail } from "../queries";

export async function doSocialLogin(formData) {
  const provider = formData.get("provider");
  await signIn(provider, { redirectTo: "/profile" });
}

export async function updateUser(userId, dataToUpdate) {
  await connectToDB();

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: dataToUpdate },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found or could not be updated");
    }

    const transformedUser = {
      name: updatedUser.name,
      email: updatedUser.email,
      profileUrl: updatedUser.profileUrl,
      id: updatedUser._id.toString(),
      jobTitle: updatedUser.jobTitle,
      location: updatedUser.location,
      description: updatedUser.description,
    };

    revalidatePath("/profile");

    return transformedUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function handleFavorite(blogId, userId) {
  await connectToDB();

  try {
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      console.log("User not found");
      return "User not found";
    }

    const isFavorite = user?.favorites?.find((id) => id.toString() === blogId);

    if (isFavorite) {
      user?.favorites.pull(blogId);
      user.save();
      return "Removed from favorites";
    } else {
      user?.favorites.push(blogId);
      user.save();
      return "Added to favorites";
    }

    revalidatePath("/profile");
    revalidatePath("/");
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createBlog(data) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  const newBlog = {
    title: data.title,
    image: data.image,
    description: data.description,
    author: user?.id,
  };
  await connectToDB();

  try {
    const blog = await blogModel.create(newBlog);
    if (blog) {
      revalidatePath("/profile");
      return blog?._id.toString();
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function updateBlog(data) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  await connectToDB();

  try {
    const blog = await blogModel.findById(data.id);
    // Update the blog with the new data
    blog.title = data.title;
    blog.image = data.image;
    blog.description = data.description;

    await blog.save();

    revalidatePath("/profile");
    return blog?._id.toString();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function deleteBlog(id) {
  await connectToDB();

  try {
    await blogModel.findByIdAndDelete(id);

    return "Blog deleted";
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function addComment(blogId, comment, userId) {
  await connectToDB();

  try {
    const newComment = await commentModel.create({
      comment,
      blogId,
      author: userId,
    });

    if (newComment) {
      return "Comment added";
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function deleteComment(id) {
  await connectToDB();

  try {
    await commentModel.findByIdAndDelete(id);

    return "Comment deleted";
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function sendEmail(user) {
  const resend = new Resend(process.env.RESEND_API_KEYS);

  try {
    const sent = await resend.emails.send({
      from: "NoReply <onboarding@resend.dev>",
      to: user?.email,
      subject: user?.subject,
      react: EmailTemplate({ name: user?.name }),
    });

    console.log(sent);
    return "Message sent";
  } catch (error) {
    throw error;
  }
}
