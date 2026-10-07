import albonImg from "@/assets/drivers/albon.webp";
import alonsoImg from "@/assets/drivers/alonso.webp";
import antonelliImg from "@/assets/drivers/antonelli.webp";
import bearmanImg from "@/assets/drivers/bearman.webp";
import bortoletoImg from "@/assets/drivers/bortoleto.webp";
import bottasImg from "@/assets/drivers/bottas.webp";
import colapintoImg from "@/assets/drivers/colapinto.webp";
import gaslyImg from "@/assets/drivers/gasly.webp";
import hadjarImg from "@/assets/drivers/hadjar.webp";
import hamiltonImg from "@/assets/drivers/hamilton.webp";
import hulkenbergImg from "@/assets/drivers/hulkenberg.webp";
import lawsonImg from "@/assets/drivers/lawson.webp";
import leclercImg from "@/assets/drivers/leclerc.webp";
import lindbladImg from "@/assets/drivers/lindblad.webp";
import norrisImg from "@/assets/drivers/norris.webp";
import oconImg from "@/assets/drivers/ocon.webp";
import perezImg from "@/assets/drivers/perez.webp";
import piastriImg from "@/assets/drivers/piastri.webp";
import russellImg from "@/assets/drivers/russell.webp";
import sainzImg from "@/assets/drivers/sainz.webp";
import strollImg from "@/assets/drivers/stroll.webp";
import verstappenImg from "@/assets/drivers/verstappen.webp";

/** Fotos oficiais de corpo inteiro, indexadas pelo id do piloto. */
export const driverPhotos: Record<string, string> = {
  albon: albonImg,
  alonso: alonsoImg,
  antonelli: antonelliImg,
  bearman: bearmanImg,
  bortoleto: bortoletoImg,
  bottas: bottasImg,
  colapinto: colapintoImg,
  gasly: gaslyImg,
  hadjar: hadjarImg,
  hamilton: hamiltonImg,
  hulkenberg: hulkenbergImg,
  lawson: lawsonImg,
  leclerc: leclercImg,
  lindblad: lindbladImg,
  max_verstappen: verstappenImg,
  norris: norrisImg,
  ocon: oconImg,
  perez: perezImg,
  piastri: piastriImg,
  russell: russellImg,
  sainz: sainzImg,
  stroll: strollImg,
};

export const getDriverPhoto = (driverId: string): string | undefined => driverPhotos[driverId];
