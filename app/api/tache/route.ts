import StripeWelcomeEmail from "@/email/email";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import React from "react";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const GET = async (req: Request) => {
  try {
    const task = await prisma.tache.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ message: "GET ERROR", error }, { status: 500 });
  }
};
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { Nom, Description, Priorite, Status, email } = body;
    const task = await prisma.tache.create({
      data: { Nom, Description, Priorite, Status, email },
    });
    const { data: donnee, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Programme des taches",
      react: React.createElement(StripeWelcomeEmail, {
        message: Description,
        name: Nom,
        priorite: Priorite,
      }),
    });
    // if (error) {
    //   throw new Error("Message not send");
    // }
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ message: "POST ERROR", error }, { status: 500 });
  }
};
export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const { Nom, Description, Priorite, Status, email, id } = body;
    const task = await prisma.tache.update({
      where: { id },
      data: { Nom, Description, Priorite, Status, email },
    });
    const { data: donnee, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Programme des taches",
      react: React.createElement(StripeWelcomeEmail, {
        message: Description,
        name: Nom,
        priorite: Priorite,
      }),
    });
    // if (error) {
    //   throw new Error("Message not send");
    // }
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ message: "POST ERROR", error }, { status: 500 });
  }
};
