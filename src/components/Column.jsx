import "./Column.css";
import Task from "./Task";

export default function Column ({ state }) {
  return (
    <div className="column">
      <p>{state}</p>
      <Task title="Task 1" />
    </div>
  )
}