import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  tasks: [],
  draggedTask: null,
  addTask: (title, state) =>
    set(
      (store) => ({ tasks: [...store.tasks, { title, state }] }),
      false,
      'addTask'
    ),
  deleteTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),
  setDraggedTask: (title) => set(() => ({ draggedTask: title })),
  moveTask: (title, state) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.title === title ? { title, state } : task
      )
    }))
});

// custom logger middleware
const logger = (config) => (set, get, api) =>
  config(
    (...args) => {
      const current = get();
      if (!current) {
        // get state from external source - useful for SSR
      }

      console.log("  applying", args);
      set(...args);
    },
    get,
    api
  );

export const useStore = create(logger(persist(devtools(store), { name: 'kanban-store' })));
