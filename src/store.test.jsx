/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useEffect } from "react";
import { useStore } from "./store";
import { vi } from "vitest";
import { render } from "@testing-library/react";

vi.mock('zustand');

function TestComponent({ selector, effect }) {
  const items = useStore(selector);

  useEffect(() => effect(items), [items]);

  return null;
}

test('should return default value at the start', () => {
  const selector = store => store.tasks;
  const effect = vi.fn();
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledWith([]);
});

test('should add an item to the store and rerun the effect', () => {
  const selector = store => ({ tasks: store.tasks, addTask: store.addTask });
  const effect = vi.fn().mockImplementation(items => {
    if (items.tasks.length === 0) {
      items.addTask('test', 'todo');
    }
  });
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(2);
  expect(effect).toHaveBeenCalledWith(
    expect.objectContaining({ tasks: [{ title: 'test', state: 'todo' }] })
  );
});

test('should add an item and delete item from the store and rerun the effect', () => {
  const selector = store => ({ tasks: store.tasks, addTask: store.addTask, deleteTask: store.deleteTask });
  let createdTask = false;
  let currentItems;
  const effect = vi.fn().mockImplementation(items => {
    currentItems = items;
    if (!createdTask) {
      items.addTask('test', 'todo');
      createdTask = true;
    } else if (items.tasks.length === 1) {
      items.deleteTask('test');
    }
  });
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(3);
  // expect(effect).toHaveBeenCalledWith(
  //   expect.objectContaining({ tasks: [{ title: 'test', state: 'todo' }] })
  // );
  expect(currentItems.tasks).toEqual([]);
});
