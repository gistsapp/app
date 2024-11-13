import { Gist } from "@/types"
import DataStorage from "./storage"
import { set } from "react-hook-form"

const globalGistStorage = new DataStorage<Gist>()

export const useGistStorage = () => {
  return {
    set: globalGistStorage.set.bind(globalGistStorage),
    getItems: globalGistStorage.getItems.bind(globalGistStorage),
  }
}
