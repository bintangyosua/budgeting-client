import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ hello: "Hello" });
}
