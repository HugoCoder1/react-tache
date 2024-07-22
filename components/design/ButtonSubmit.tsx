"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

export default function ButtonSubmit({
  nom,
  loading,
}: {
  nom: string;
  loading?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full disabled:cursor-not-allowed"
      disabled={loading}
    >
      {pending ? "En cours d'ajout" : nom}
    </Button>
  );
}
