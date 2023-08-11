import "./Column.css";
import { useState } from "react";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import Task from "./Task";

export default function Column ({ state }) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const tasks = useStore(store =>
    store.tasks.filter(task => task.state === state),
    shallow
  );

  // const filtered = useMemo(() => tasks.filter(task => task.state === state), [tasks, state]); -- you can use this instead of shallow

  const addTask = useStore(store => store.addTask);

  return (
    <div className="column">
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>

      {tasks.map(task => (
        <Task key={task.title} title={task.title} />
      ))}
      {open && (
        <div className="modal">
          <div className="modalContent">
            <input onChange={e => setText(e.target.value)} value={text} />
            <button
              onClick={() => {
                addTask(text, state);
                setText('');
                setOpen(false);
              }}
            >
              Add
            </button>
            <button onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}