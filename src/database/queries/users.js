import connectToDB from "../connectToDB";
import { userModel } from "../models/userModel";

export async function getUser(email) {
  await connectToDB();

  try {
    const user = await userModel.findOne({ email }).select("-password").lean(); // Using lean for better performance

    if (user) {
      return user;
    } else {
      return null; // Explicitly return null when the user is not found
    }
  } catch (error) {
    console.error("Error fetching user:", error); // Log error for debugging
    throw new Error("Error fetching user"); // Throw a new error with a message
  }
}
