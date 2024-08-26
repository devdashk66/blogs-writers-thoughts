import { auth } from "@/auth";
import connectToDB from "@/database/connectToDB";
import { getUserByEmail } from "@/database/queries";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "You are not authenticated" },
      { status: 401 }
    );
  }

  await connectToDB();

  try {
    const user = await getUserByEmail(session?.user?.email);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
