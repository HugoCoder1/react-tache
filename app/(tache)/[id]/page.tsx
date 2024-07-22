// "use client";
import React from "react";

import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getTacheById, updateTache } from "@/actions/tache";
import ButtonSubmit from "@/components/design/ButtonSubmit";

export default async function UpdateTask({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const tache = await getTacheById(id);

  return (
    <div className="space-y-6">
      <h1>Modifier une nouvelle tache</h1>
      <form
        action={async (data) => {
          "use server";
          updateTache(id, data);
        }}
      >
        <div className="my-2">
          <label htmlFor="Nom">Nom:</label>
          <Input type="text" name="nom" id="Nom" defaultValue={tache?.Nom} />
        </div>
        <div className="my-2">
          <label htmlFor="description">Description:</label>
          <Textarea
            name="description"
            id="description"
            defaultValue={tache?.Description}
          />
        </div>
        <div className="my-2">
          <label htmlFor="Email">Email:</label>
          <Input
            type="email"
            name="email"
            id="Email"
            defaultValue={tache?.email}
          />
        </div>
        <div className="my-2">
          <label htmlFor="priorité">Priorité:</label>
          <select name="priorite" id="priorité" defaultValue={tache?.Priorite}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="my-2">
          <label htmlFor="status">Status:</label>
          <select name="status" id="status" defaultValue={tache?.Status}>
            <option value="A_faire">A faire</option>
            <option value="En_cours">En cours</option>
            <option value="Termine">Terminé</option>
          </select>
        </div>
        <br />
        <ButtonSubmit nom="Update" />
      </form>
    </div>
  );
}
