import { create } from "zustand"

type Todo = {
  id: string
  title: string
  description: string
}

type TodoStore = {
  todos: Todo[]
  addTodo: (todo: Omit<Todo, "id">) => void
  updateTodo: (id: string, updatedTodo: Partial<Todo>) => void
  deleteTodo: (id: string) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, { ...todo, id: Date.now().toString() }],
    })),
  updateTodo: (id, updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo)),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}))

