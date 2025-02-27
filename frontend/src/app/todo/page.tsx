"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTodoStore } from "../store/todoStore";
import { useAuthStore } from "../store/authStore";
import TodoForm from "@src/components/TodoForm";
import TodoList from "@src/components/TodoList";

export default function TodoPage() {
  const router = useRouter();
  const { isAuthenticated, token } = useAuthStore();
  const { todos, addTodo, getTodos, updateTodo, deleteTodo } = useTodoStore();

  useEffect(() => {
    console.log(isAuthenticated)
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    (async () => {
      if (token) {
        await getTodos(token as string);
      }
    })();
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
        <TodoForm onAddTodo={addTodo} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
        <TodoList
          todos={todos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}
