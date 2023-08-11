import { create } from "zustand";

const store = (set) => ({
  tasks: [{ title: 'TestTask', state: 'PLANNED' }],
});

export const useStore = create(store);
