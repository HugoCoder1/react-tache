"use server";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import React from "react";
import prisma from "@/utils/prisma";
import StripeWelcomeEmail from "@/email/email";

const resend = new Resend(process.env.RESEND_API_KEY);
// Récupérer toutes les taches
export const getAllTache = async () => {
  return await prisma.tache.findMany({
    orderBy: { createdAt: "desc" },
  });
};
// Récupérer toutes les taches par id
export const getTacheById = async (id: string) => {
  return await prisma.tache.findUnique({
    where: { id },
  });
};

//AJOUTER UNE NOUVELLE TACHE

export const addTache = async (formData: FormData) => {
  const tachedata = {
    nom: formData.get("nom") as string,
    description: formData.get("description") as string,
    email: formData.get("email") as string,
    priorité: formData.get("priorite") as string,
    status: formData.get("status"),
  };
  await prisma.tache.create({
    data: {
      Nom: tachedata.nom as string,
      Description: tachedata.description as string,
      Priorite: tachedata.priorité as string,
      Status: tachedata.status as string,
      email: tachedata.email as string,
    },
  });
  revalidatePath("/");
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: tachedata.email,
    subject: "Programme des taches",
    react: React.createElement(StripeWelcomeEmail, {
      message: tachedata.description,
      name: tachedata.nom,
      priorite: tachedata.priorité,
    }),
    // html: `<h1>${tachedata.nom} ${tachedata.description}</h1>`,
  });
  if (error) {
    throw new Error("Message not send");
  }
  return data;
};

//SUPPRIMER UNE TACHE
export const deleteTache = async (id: string) => {
  await prisma.tache.delete({
    where: { id },
  });
  revalidatePath("/");
};

//MODIFIER LA TACHE
export const updateTache = async (id: string, formData: FormData) => {
  const data = {
    nom: formData.get("nom") as string,
    description: formData.get("description") as string,
    priorite: formData.get("priorite") as string,
    status: formData.get("status") as string,
    email: formData.get("email") as string,
  };
  await prisma.tache.update({
    where: { id },
    data: {
      Nom: data.nom as string,
      Description: data.description as string,
      Priorite: data.priorite as string,
      Status: data.status as string,
      email: data.email as string,
    },
  });
  revalidatePath("/");
  const { data: donnee, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: data.email,
    subject: "Mis à jour du programme des taches",
    react: React.createElement(StripeWelcomeEmail, {
      message: data.description,
      name: data.nom,
      priorite: data.priorite,
    }),
  });
  if (error) {
    throw new Error("Message not send");
  }
  return donnee;
};
