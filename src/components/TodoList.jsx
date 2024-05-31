"use client";

import { deleteTodoInDB, updateTodoInDB } from "@/apis/todos";
import { markDone, removeTodo } from "@/slices/todoSlice";
import { serverTimestamp } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import Logout from "./Logout";

const TodoList = (props) => {
  const { todos, fetchTodos, setEditing, setTitle, setSelectedTodo } = props;

  const dispatch = useDispatch();

  const uid = useSelector((state) => state.auth.user.uid);

  const deleteTodo = async (id) => {
    const res = await deleteTodoInDB(id);
    if (res) {
      dispatch(removeTodo(id));
      alert(res);
    }
    fetchTodos(uid);
  };

  const editTodo = (todo) => {
    setEditing(true);
    setTitle(todo.title);
    setSelectedTodo(todo);
  };

  const markAsDone = async (todo) => {
    let updatedTodo = {
      ...todo,
      status: !todo.status,
      updatedAt: serverTimestamp(),
    };

    const res = await updateTodoInDB(todo.id, updatedTodo);
    if (res === "Todo updated successfully!") {
      dispatch(markDone(todo.id));
      setTitle("");
      alert(res);
    } else {
      alert(res);
    }

    fetchTodos(uid);
  };

  return (
    <div className="h-full flex flex-col flex-1 border-l border-gray-300 p-4">
      <Logout />
      <section className="flex flex-col gap-3 p-4 overflow-auto">
        {todos?.map((todo) => {
          return (
            <div
              key={todo.id}
              className="flex justify-center p-3 m-auto rounded-lg h-16 w-4/6 bg-purple-200"
            >
              <span
                className={`flex items-center flex-1 align-center cursor-pointer font-medium capitalize text-slate-600 ${
                  todo.status ? "line-through" : ""
                }`}
              >
                {todo.title}
              </span>
              <section className="flex gap-3">
                <button
                  onClick={() => editTodo(todo)}
                  className="bg-white p-2 border font-medium rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-sky-500 p-2 border font-medium rounded-lg text-white"
                >
                  Delete
                </button>
                <button
                  onClick={() => markAsDone(todo)}
                  className={`${
                    !todo.status ? "bg-orange-300" : "bg-red-400"
                  } text-white font-medium p-2 border rounded-lg`}
                >
                  {todo.status ? "Not done" : "Done"}
                </button>
              </section>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default TodoList;
