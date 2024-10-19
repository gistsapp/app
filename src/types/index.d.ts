import { Language } from "@/lib/language";

export interface Team {
  id: string;
  name: string;
  gists: Gist[];
}

export interface Gist {
  id: string;
  description: string;
  language: Language;
  name: string;
  code: string;
}
