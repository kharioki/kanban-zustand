import "./Column.css";
import { useState, useEffect, useRef } from "react";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import Task from "./Task";
import classNames from "classnames";

export default function Column ({ state }) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore(store =>
    store.tasks.filter(task => task.state === state),
    shallow
  );

  // const filtered = useMemo(() => tasks.filter(task => task.state === state), [tasks, state]); -- you can use this instead of shallow

  const addTask = useStore(store => store.addTask);

  const setDraggedTask = useStore(store => store.setDraggedTask);
  const draggedTask = useStore(store => store.draggedTask);
  const moveTask = useStore(store => store.moveTask);

  return (
    <div
      className={classNames("column", { drop })}
      onDragOver={e => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={e => {
        setDrop(false)
        e.preventDefault();
      }}
      onDrop={e => {
        setDrop(false);
        setDraggedTask(null);
        console.log(draggedTask);
        moveTask(draggedTask, state);
      }}
    >
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

// store state in refs if we dont want to rerender the component when state changes
// function RefTest() {
//   const ref = useRef();

//   useEffect(() => {
//     useStore.subscribe((store) =>
//       store.tasks,
//       (tasks) => {ref.current = tasks},
//     );
//   }, []);

//   return ref.current;
// }