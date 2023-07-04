import TodoItem from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";

async function toggleTodo(id: string, completed: boolean) {
  "use server";
  await prisma.todo.update({
    where: { id },
    data: { completed: completed },
  });
}

export default async function Home() {
  const todos = await prisma.todo.findMany();
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl">Welcome back, user</h1>
          {todos && (
            <h2 className="text-zinc-500">
              You've got{" "}
              {todos.filter((item) => item.completed !== true).length} pending
              tasks.
            </h2>
          )}
        </div>
        <Link
          className="bg-stone-100 text-slate-400 px-4 py-3 rounded hover:bg-stone-500 hover:text-slate-50 focus-within:bg-stone-500 outline-none"
          href="/new"
        >
          New item
        </Link>
      </header>
      <ul role="list" className="flex flex-col gap-2">
        {todos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />;
        })}
      </ul>
    </>
  );
}
