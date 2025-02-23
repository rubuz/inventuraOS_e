export type Form = {
  user: string;
  password: string;
};

interface Error {
  error: boolean;
  text: string;
}

interface LoginResultItem {
  app_displayname: string;
  app_id: number;
  db_password: string;
  db_role: string;
  db_username: string;
  displayname: string;
  is_admin: boolean;
}

export interface LoginResponse {
  result: LoginResultItem[] | null;
  error: Error;
}

export interface LastnikOSResult {
  ime: string;
  lokacija: number;
  lokacija_inv: number;
  naziv_inv: string;
  obrat_ime: string;
  osstanje_ime: string;
  popisan: string;
  sifra: number;
  spec1: string;
  stev_old: number;
  stev_old_naziv: string;
}

export interface LastnikOSResponse {
  error: Error;
  result: LastnikOSResult | null;
}

export interface sendParams {
  stev: number;
  lokacija: number;
  stev_old: number;
  naziv_inv: string;
}

type NazivItem = {
  naziv: string;
};

export type NaziviResponse = NazivItem[];

type ToastType = "success" | "info" | "error";

export interface ShowToastParams {
  type: ToastType;
  text1: string;
  text2?: string;
}

export interface PotrdiloResponse {
  error: Error;
}

export interface ModalProps {
  visible: boolean;
  onChoice: (choice: boolean) => void;
}
