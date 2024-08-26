import connectToDB from "@/database/connectToDB";
import { userModel } from "@/database/models/userModel";
import { getUser } from "@/database/queries/users";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { firstName, lastName, email, password } = await request.json();
    const name = `${firstName} ${lastName}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectToDB();

    const foundUser = await getUser(email);

    if (foundUser) {
      return NextResponse.json(
        { error: "User is already registered" },
        { status: 400 }
      );
    }

    await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User has been created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
