"use client";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

const AddTodo = (props) => {
  const { setTitle, title, addNewTodo, fetchTodos } = props;

  const dispatch = useDispatch();

  const uid = useSelector((state) => state.auth.user.uid);
  const todos = useSelector((state) => state.todo.todos);

  useEffect(() => {
    fetchTodos(uid);
  }, [dispatch]);

  return (
    <div className="flex flex-col flex-1 gap-6">
      <span className="flex justify-center text-5xl font-medium">
        To-Do list
      </span>
      <form onSubmit={addNewTodo} className="flex justify-center gap-4">
        <input
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          placeholder="Add Todo"
          className="border border-slate-500 p-2 border rounded-md outline-none"
        />
        <button type="submit" className="bg-slate-300 text-white p-2 border border-slate-400 font-medium rounded-lg">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
