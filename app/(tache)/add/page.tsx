"use client";
import React, { useState } from "react";
import { addTache } from "@/actions/tache";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import ButtonSubmit from "@/components/design/ButtonSubmit";
// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);
const baseurl = process.env.NEXT_PUBLIC_BASE_API_URL;

export default function AddTask() {
  const router = useRouter();
  const [Nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [Description, setDescription] = useState("");
  const [Priorite, setPriorite] = useState("Medium");
  const [Status, setStatus] = useState("A_faire");
  const [loading, setLoading] = useState(false);

  // const [task, setTask] = useState({
  //   Nom: "",
  //   Description: "",
  //   Priorite: "",
  //   Status: "",
  //   email: "",
  // });

  //FUNCTION DE SOUMISSON POUR L'AJOUT D'UNE TACHE
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseurl}/api/tache`, {
        Nom,
        Description,
        Priorite,
        Status,
        email,
      });
      if (res.status == 200) {
        toast.success(`Tache ajouter et envoyé à ${email}`);
        router.push("/");
      }
    } catch (error) {
      toast.error("Une erreur a eu lieu");
    } finally {
      setLoading(false);
      setNom("");
      setDescription("");
      setPriorite("Medium");
      setStatus("A_faire");
      setEmail("");
    }
  };
  return (
    <div className="space-y-6">
      <h1>Ajouter une nouvelle tache</h1>
      <form
        onSubmit={handleSubmit}
        // action={addTache}
      >
        <div className="my-2">
          <label htmlFor="Nom">Nom:</label>
          <Input
            required
            type="text"
            name="nom"
            id="Nom"
            value={Nom.trim()}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className="my-2">
          <label htmlFor="description">Description:</label>
          <Textarea
            required
            name="description"
            id="description"
            value={Description.trim()}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="my-2">
          <label htmlFor="Email">Email:</label>

          <Input
            required
            type="email"
            name="email"
            id="Email"
            value={email.trim()}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-2">
          <label htmlFor="priorité">Priorité:</label>

          <select
            required
            name="priorite"
            id="priorité"
            value={Priorite.trim()}
            onChange={(e) => setPriorite(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="my-2">
          <label htmlFor="status">Status:</label>
          <select
            required
            name="status"
            id="status"
            value={Status.trim()}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="A_faire">A faire</option>
            <option value="En_cours">En cours</option>
            <option value="Termine">Terminé</option>
          </select>
        </div>
        <br />
        <ButtonSubmit nom="Ajouter" />
      </form>
    </div>
  );
}
