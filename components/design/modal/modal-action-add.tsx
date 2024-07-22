import { Button } from "@/components/ui/button";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyIcon, Pencil, Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import ButtonSubmit from "../ButtonSubmit";
type Props = {
  formData: any;
  Nom: string | number | readonly string[] | undefined;
  setNom: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  Priorite: string;
  setPriorite: React.Dispatch<React.SetStateAction<string>>;
  Status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  Description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleSubmit: any;
  loading: boolean;
};
export default function ModalActionAdd({
  formData,
  handleOpenModal,
  handleCloseModal,
  handleSubmit,
  Nom,
  setNom,
  Description,
  setDescription,
  email,
  setEmail,
  Priorite,
  setPriorite,
  Status,
  setStatus,
  loading,
}: Props) {
  return (
    <div>
      <Button
        asChild
        className="rounded-full w-10 h-10 hover:translate-x-1"
        onClick={handleOpenModal}
      >
        <Plus width={100} />
      </Button>
      {formData.isOpen && (
        <Dialog open={formData.isOpen} onOpenChange={handleCloseModal}>
          <DialogTrigger /> {/* Empty trigger */}
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tache</DialogTitle>
            </DialogHeader>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <div className="my-2">
                  <label htmlFor="Nom">Nom:</label>
                  <Input
                    required
                    type="text"
                    name="nom"
                    id="Nom"
                    value={Nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </div>
                <div className="my-2">
                  <label htmlFor="description">Description:</label>
                  <Textarea
                    required
                    name="description"
                    id="description"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="my-2">
                  <label htmlFor="Email">Assigné à:</label>

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
                    className="w-full"
                    required
                    name="priorite"
                    id="priorité"
                    value={Priorite.trim()}
                    // defaultValue={"Medium"}
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
                    className="w-full"
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
                <ButtonSubmit nom="Ajouter" loading={loading} />
              </form>
            </DialogContent>
            <DialogFooter>
              <DialogClose onClick={handleCloseModal}>
                {/* <Button type="button" >
                      Close
                    </Button> */}
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
