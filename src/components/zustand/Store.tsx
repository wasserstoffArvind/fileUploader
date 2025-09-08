import { create } from "zustand";

interface DataStore<T = unknown> {
  data: T | null;
  setData: (newData: T) => void;
}

const useDataStore = create<DataStore>((set) => ({
  data: null,
  setData: (newData) => set({ data: newData }),
}));

export default useDataStore;
