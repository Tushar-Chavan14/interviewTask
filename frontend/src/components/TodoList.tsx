"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

type Todo = {
  id: string
  title: string
  description: string
}

export default function TodoList({
  todos,
  onUpdateTodo,
  onDeleteTodo,
}: {
  todos: Todo[]
  onUpdateTodo: (id: string, todo: Partial<Todo>) => void
  onDeleteTodo: (id: string) => void
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const startEditing = (id: string) => {
    setEditingId(id)
  }

  const stopEditing = () => {
    setEditingId(null)
  }

  const onSubmit = async (data: any) => {
    if (editingId) {
      await onUpdateTodo(editingId, data)
      stopEditing()
    }
  }

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li key={todo.id} className="bg-white shadow-md rounded-lg p-4">
          {editingId === todo.id ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <input
                type="text"
                defaultValue={todo.title}
                {...register("title")}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
              <textarea
                defaultValue={todo.description}
                {...register("description")}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
              {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
              <div className="flex justify-end space-x-2">
                <button type="submit" className="px-3 py-1 bg-green-500 text-white rounded-md">
                  Save
                </button>
                <button type="button" onClick={stopEditing} className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h3 className="text-lg font-semibold">{todo.title}</h3>
              <p className="text-gray-600">{todo.description}</p>
              <div className="flex justify-end space-x-2 mt-2">
                <button onClick={() => startEditing(todo.id)} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                  Edit
                </button>
                <button onClick={() => onDeleteTodo(todo.id)} className="px-3 py-1 bg-red-500 text-white rounded-md">
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

