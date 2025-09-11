import { create } from "zustand";
import { ApiResponse } from "@/utlis/types";
interface DataStore {
  data: ApiResponse | null;
  setData: (newData: ApiResponse) => void;
  fileName: string | null
  setFileName:(name:string)=> void
}

const useDataStore = create<DataStore>((set) => ({
  data: null,
  fileName:null,
  setData: (newData) => set({ data: newData }),
  setFileName:(name:string)=>set({fileName: name})
}));

export default useDataStore;
