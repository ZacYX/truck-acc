import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateEmail } from '../lib/zod-validation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get("content-type") !== "application/json") {
      return NextResponse.json("Wrong content-type", { status: 400 });
    }
    const email = await req.json();
    const validateResult = validateEmail.safeParse(email);
    if (!validateResult.success) {
      console.log("Invalid email!");
      console.log(validateResult.error);
      return NextResponse.json("Invalid email!", { status: 400 });
    }
    const { data, error } = await resend.emails.send({
      ...email,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}