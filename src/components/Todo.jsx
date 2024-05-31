import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { serverTimestamp } from "firebase/firestore";

import { addTodoToDB, fetchTodosfromDB, updateTodoInDB } from "@/apis/todos";
import { addTodo, editTodo, setTodos } from "@/slices/todoSlice";

import Auth from "./Auth";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.user.accessToken);
  const uid = useSelector((state) => state.auth.user.uid);
  const todos = useSelector((state) => state.todo.todos);

  async function fetchTodos(uid) {
    const res = await fetchTodosfromDB(uid);
    if (res === "Error fetching todos.") {
      alert(res);
    }
    dispatch(setTodos(res));
  }

  const addNewTodo = async (e) => {
    e.preventDefault();
    if (editing) {
      if (selectedTodo) {
        let updatedTodo = {
          ...selectedTodo,
          title: title,
          updatedAt: serverTimestamp(),
        };

        const res = await updateTodoInDB(selectedTodo.id, updatedTodo);
        if (res === "Todo updated successfully") {
          dispatch(editTodo({ ...selectedTodo, title: title }));
          setTitle("");
          setEditing(false);
        } else {
          alert(res);
          setTitle("");
          setEditing(false);
        }
      }
    } else {
      const res = await addTodoToDB(title, false, uid);
      if (res.message === "Todo added successfully!") {
        dispatch(
          addTodo([
            ...todos,
            {
              id: res.id,
              title: title,
              status: false,
              userId: uid,
            },
          ])
        );
        setTitle("");
        alert(res.message);
      } else {
        setTitle("");
        alert(res);
      }
    }
    fetchTodos(uid);
  };

  return (
    <div>
      {accessToken ? (
        <div className="h-screen flex items-center justify-center w-100% border border-slate-500">
          <AddTodo
            fetchTodos={fetchTodos}
            title={title}
            setTitle={setTitle}
            addNewTodo={addNewTodo}
          />
          <TodoList
            todos={todos}
            fetchTodos={fetchTodos}
            setEditing={setEditing}
            setTitle={setTitle}
            setSelectedTodo={setSelectedTodo}
          />
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default Todo;
