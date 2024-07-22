"use client";

import { deleteTache } from "@/actions/tache";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const ButtonDetele = ({ tache }: { tache: any }) => {
  const handleDelete = async (tacheId: string) => {
    const res = await axios.delete(`/api/tache/${tacheId}`);
    if (res.status == 200) {
      toast.success(`Tache ${tache.Nom} supprimer avec succès`);
    }
  };
  return (
    <Button
      className="bg-red-500 h-7 rounded-full hover:bg-red-600  hover:-rotate-180"
      onClick={() => deleteTache(tache.id)}
    >
      <Trash2 className="w-6 h-6" />
    </Button>
  );
};

export default ButtonDetele;
