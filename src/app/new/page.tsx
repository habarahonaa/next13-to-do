import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

async function saveTodo(data: FormData) {
  "use server";
  const todoTitle = data.get("title")?.valueOf();
  if (typeof todoTitle !== "string" || todoTitle.length === 0) {
    throw new Error("Invalid title!");
  }
  const todoDescription = data.get("about")?.valueOf();
  if (typeof todoDescription !== "string" || todoDescription.length === 0) {
    throw new Error("Invalid description!");
  }
  await prisma.todo.create({
    data: {
      title: todoTitle,
      description: todoDescription,
      completed: false,
    },
  });
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New item</h1>
        <Link
          className="bg-stone-100 text-slate-400 px-4 py-3 rounded hover:bg-stone-500 hover:text-slate-50 focus-within:bg-stone-500 outline-none"
          href="/"
        >
          Go back
        </Link>
      </header>
      <form action={saveTodo}>
        <div className="sm:col-span-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Todo title
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="title"
                id="title"
                className="block flex-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 py-2.5 pl-1 text-gray-900 placeholder:text-slate-200 focus:ring-0 sm:text-sm sm:leading-6"
              ></input>
            </div>
          </div>
        </div>
        <div className="col-span-4 mt-4">
          <label
            htmlFor="about"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            About
          </label>
          <div className="mt-2">
            <textarea
              id="about"
              name="about"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Write a few sentences describing the task.
          </p>
        </div>
        <div className="mt-4 flex items-center justify-start gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
