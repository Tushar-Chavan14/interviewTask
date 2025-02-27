import { TODOS_ENDPOINTS } from "@src/constants";
import axios from "axios";
import { create } from "zustand";

type Todo = {
  todoId: string;
  title: string;
  description: string;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (todo: Todo, token: string) => Promise<void>;
  updateTodo: (id: string, data: Partial<Todo>, token: string) => Promise<void>;
  deleteTodo: (id: string, token: string) => Promise<void>;
  getTodos: (token: string) => Promise<void>;
};

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  addTodo: async (todo, token) => {
    try {
      const req = await axios.post(TODOS_ENDPOINTS.create, todo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (req.status === 201) {
        get().getTodos(token);
      }

      get().getTodos(token);
    } catch (error) {}
  },
  updateTodo: async (id, data, token) => {
    try {
      const req = await axios.patch(
        TODOS_ENDPOINTS.update(id),
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (req.status === 200) {
        get().getTodos(token);
      }
    } catch (error) {}
  },
  deleteTodo: async (id, token) => {
    try {
      const req = await axios.delete(TODOS_ENDPOINTS.delete(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (req.status === 200) {
        get().getTodos(token);
      }
    } catch (error) {
      console.error("Delete todo error:", error);
    }
  },
  getTodos: async (token) => {
    try {
      const req = await axios.get(TODOS_ENDPOINTS.get, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (req.status === 200) {
        set({ todos: req.data?.data?.todos as Todo[] });
      }
    } catch (error) {
      console.error("Get todos error:", error);
    }
  },
}));
