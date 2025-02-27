"use client";

import TodoForm from "@src/components/TodoForm";
import TodoList from "@src/components/TodoList";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useTodoStore } from "../store/todoStore";

export default function TodoPage() {
  const { token } = useAuthStore();
  const { todos, addTodo, getTodos, updateTodo, deleteTodo } = useTodoStore();

  useEffect(() => {
    (async () => {
      if (token) {
        await getTodos(token as string);
      }
    })();
  }, []);

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
