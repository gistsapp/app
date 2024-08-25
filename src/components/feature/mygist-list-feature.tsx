import { Gist } from "@/types";
import MyGistList from "../ui/mygist-list";

// TODO: Get the gists list

const gistMock: Gist[] = [
  {
    id: "1",
    name: "My first Gist",
    code: 'console.log("Hello, World!")',
  },
  {
    id: "2",
    name: "My second Gist",
    code: 'console.log("Hello, World!")',
  },
  {
    id: "3",
    name: "My third Gist",
    code: 'console.log("Hello, World!")',
  },
  {
    id: "4",
    name: "My fourth Gist",
    code: 'console.log("Hello, World!")',
  },
];

export function MyGistListFeature() {
  return <MyGistList gists={gistMock} />;
}
