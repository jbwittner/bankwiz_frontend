// This is an example of how to read a JSON Web Token from an API route
import { getServerSession } from "next-auth"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(req: any) {
  //console.log("req", req)
  const session = await getServerSession(authOptions)
  console.log("==== before session =====")
  console.log("session", session)
  // @ts-ignore
  console.log("accessToken", session?.accessToken)
  console.log("==== after session =====")
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}