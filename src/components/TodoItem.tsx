"use client";
import React from "react";

type TodoItemProps = {
  id: string;
  title: string;
  completed: boolean;
  description: string | null;
  toggleTodo: (id: string, completed: boolean) => void;
};

export default function TodoItem({
  id,
  title,
  description,
  completed,
  toggleTodo,
}: TodoItemProps) {
  return (
    <li className="flex flex-col gap-2 rounded-md drop-shadow p-6 bg-stone-100">
      <div className="flex gap-2 items-center">
        <input
          id={id}
          type="checkbox"
          className="cursor-pointer peer"
          defaultChecked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        ></input>
        <label
          htmlFor={id}
          className="font-medium peer-checked:line-through peer-checked:text-slate-500"
        >
          {title}
        </label>
      </div>
      <div>
        {description && (
          <div>
            <p>{description}</p>
          </div>
        )}
      </div>
    </li>
  );
}
