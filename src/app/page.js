"use client";

import Todo from "@/components/Todo";
import { store } from "@/slices/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
}
