import { create } from "zustand";
import { ApiResponse } from "@/utlis/types";
interface DataStore {
  data: ApiResponse | null;
  setData: (newData: ApiResponse) => void;
}

const useDataStore = create<DataStore>((set) => ({
  data: null,
  setData: (newData) => set({ data: newData }),
}));

export default useDataStore;
