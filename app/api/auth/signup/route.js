import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "../../../../lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json(); 

    if (!name || !email || !password || !role) { 
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role 
    });

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    // Return user data including role
    return NextResponse.json({ 
      message: "Signup successful",
      role: newUser.role,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error("Signup error:", err); // Add logging
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}