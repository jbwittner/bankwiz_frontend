// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req: any) {
  console.log("req", req)
  const token = await getToken({ req })
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2))
  }
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}