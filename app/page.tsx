"use client";
import React, { useState } from "react";
import useSWR from "swr";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { SkeletonCard } from "@/components/design/CardSkeletton";
import ButtonDetele from "@/components/design/ButtonDetele";
import axios from "axios";

//LIEN EN PRODUCTION ENVIRONNEMENT
const baseurl = process.env.NEXT_PUBLIC_BASE_API_URL;

//COMPOSANT PRINCIPALE
export default function Home() {
  const [PrioriteChange, setPrioriteChange] = useState("");

  // FETCH DATA LISTE DES TACHES AVEC SWR
  const fetchtache = (url: any) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${baseurl}/api/tache`,
    fetchtache,
    {
      refreshInterval: 100,
    }
  );

  if (error) {
    return <div>Une erreur a eu lieu</div>;
  }

  //EN CHARGEMENT
  if (isLoading) {
    return <SkeletonCard />;
  }
  //CONDITION DE SWITCH DES STATUS
  const switchStatus = (status: string) => {
    switch (status) {
      case "En_cours":
        return <Badge className="bg-green-300 text-dark">En cours</Badge>;
        break;
      case "A_faire":
        return <Badge className="bg-yellow-300 text-dark">A faire</Badge>;
        break;
      case "Termine":
        return <Badge>Terminé</Badge>;
        break;
    }
  };

  //FILTRER PAR PRIORITE
  const filterDataPriorite = () => {
    switch (PrioriteChange) {
      case "Low":
        return data.filter((tache: any) => tache.Priorite === "Low");
        break;
      case "Medium":
        return data.filter((tache: any) => tache.Priorite === "Medium");
        break;
      case "High":
        return data.filter((tache: any) => tache.Priorite === "High");
        break;
      case "All":
        return data;
        break;

      default:
        return data;
        break;
    }
  };
  return (
    <div>
      <div className="flex justify-between p-3 items-center">
        <div className="flex justify-between  items-center">
          <h1>Liste des taches</h1>
          <div className="flex gap-x-4 ml-4">
            <Badge
              onClick={() => setPrioriteChange("All")}
              className="hover:cursor-pointer"
            >
              All
            </Badge>
            <Badge
              onClick={() => setPrioriteChange("Low")}
              className="hover:cursor-pointer"
            >
              Low
            </Badge>
            <Badge
              onClick={() => setPrioriteChange("Medium")}
              className="hover:cursor-pointer"
            >
              Medium
            </Badge>
            <Badge
              onClick={() => setPrioriteChange("High")}
              className="hover:cursor-pointer"
            >
              High
            </Badge>
          </div>
        </div>
        <div>
          <Button
            asChild
            className="rounded-full w-10 h-10 hover:translate-x-1"
          >
            <Link href={"/add"}>
              {" "}
              <Plus width={100} />
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row  md:grid md:grid-cols-2 lg:grid-cols-3">
        {filterDataPriorite().map((tache: any) => (
          <>
            <div className="p-3" key={tache.id}>
              <div className="relative">
                <Card className="min-w-[370px] h-[230px]">
                  <CardHeader>
                    <CardTitle>
                      <div className="flex justify-between items-center">
                        <p> Nom:{tache.Nom}</p>
                        <Badge className="w-30">Email:{tache.email}</Badge>
                      </div>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      Description:{tache.Description}
                    </CardDescription>
                  </CardHeader>
                  <div>
                    <CardContent className="absolute bottom-14 right-0">
                      {switchStatus(tache.Status)}
                    </CardContent>
                    <CardContent className="absolute bottom-14 left-0">
                      <Badge>Priorité:{tache.Priorite}</Badge>
                    </CardContent>
                  </div>
                  <CardFooter className="absolute -bottom-3">
                    <div className="flex gap-x-2">
                      <div>
                        <Button
                          asChild
                          className="bg-green-500 h-7 hover:bg-green-600 hover:-rotate-180 "
                        >
                          <Link href={`/${tache.id}`}>
                            {" "}
                            <Pencil className="w-6 h-6" />
                          </Link>
                        </Button>
                      </div>

                      <ButtonDetele tache={tache} />
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
