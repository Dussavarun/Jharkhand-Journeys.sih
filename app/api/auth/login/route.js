// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
// import connectDB from "@/lib/mongodb";
// import User from "@/models/User";

// export async function POST(req) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     await connectDB();

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     cookies().set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60,
//       path: "/",
//     });

//     return NextResponse.json({ message: "Login successful" });
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "../../../../models/User";
import connectDB from "../../../../lib/mongodb";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
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
      message: "Login successful",
      role: user.role, // Include role in response
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login error:", err); // Add logging
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
