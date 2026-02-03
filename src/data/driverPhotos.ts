// Driver photo imports
import norrisImg from "@/assets/drivers/norris.png";
import piastriImg from "@/assets/drivers/piastri.png";
import verstappenImg from "@/assets/drivers/verstappen.png";
import hadjarImg from "@/assets/drivers/hadjar.png";
import russellImg from "@/assets/drivers/russell.png";
import antonelliImg from "@/assets/drivers/antonelli.png";
import leclercImg from "@/assets/drivers/leclerc.png";
import hamiltonImg from "@/assets/drivers/hamilton.png";
import alonsoImg from "@/assets/drivers/alonso.png";
import strollImg from "@/assets/drivers/stroll.png";
import albonImg from "@/assets/drivers/albon.png";
import sainzImg from "@/assets/drivers/sainz.png";
import hulkenbergImg from "@/assets/drivers/hulkenberg.png";
import bortoletoImg from "@/assets/drivers/bortoleto.png";
import bottasImg from "@/assets/drivers/bottas.png";
import perezImg from "@/assets/drivers/perez.png";
import oconImg from "@/assets/drivers/ocon.png";
import bearmanImg from "@/assets/drivers/bearman.png";
import lawsonImg from "@/assets/drivers/lawson.png";
import lindbladImg from "@/assets/drivers/lindblad.png";
import gaslyImg from "@/assets/drivers/gasly.png";
import colapintoImg from "@/assets/drivers/colapinto.png";

// Map driver names to their photos
export const driverPhotos: Record<string, string> = {
  "Lando Norris": norrisImg,
  "Oscar Piastri": piastriImg,
  "Max Verstappen": verstappenImg,
  "Isack Hadjar": hadjarImg,
  "George Russell": russellImg,
  "Kimi Antonelli": antonelliImg,
  "Charles Leclerc": leclercImg,
  "Lewis Hamilton": hamiltonImg,
  "Fernando Alonso": alonsoImg,
  "Lance Stroll": strollImg,
  "Alexander Albon": albonImg,
  "Carlos Sainz": sainzImg,
  "Nico Hulkenberg": hulkenbergImg,
  "Gabriel Bortoleto": bortoletoImg,
  "Valtteri Bottas": bottasImg,
  "Sergio Pérez": perezImg,
  "Esteban Ocon": oconImg,
  "Oliver Bearman": bearmanImg,
  "Liam Lawson": lawsonImg,
  "Arvid Lindblad": lindbladImg,
  "Pierre Gasly": gaslyImg,
  "Franco Colapinto": colapintoImg,
};

export const getDriverPhoto = (driverName: string): string | undefined => {
  return driverPhotos[driverName];
};
