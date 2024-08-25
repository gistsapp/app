export interface Team {
  id: string;
  name: string;
  gists: Gist[];
}

export interface Gist {
  id: string;
  name: string;
  code: string;
}
