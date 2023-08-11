import "./Column.css";
import { useMemo } from "react";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import Task from "./Task";

export default function Column ({ state }) {
  const tasks = useStore(store =>
    store.tasks.filter(task => task.state === state),
    shallow
  );

  // const filtered = useMemo(() => tasks.filter(task => task.state === state), [tasks, state]); -- you can use this instead of shallow

  return (
    <div className="column">
      <p>{state}</p>
      {tasks.map(task => (
        <Task key={task.title} title={task.title} />
      ))}
    </div>
  )
}