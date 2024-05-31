import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const fetchTodosfromDB = async (uid) => {
  try {
    const todosCollection = collection(db, "todos");
    const q = query(
      todosCollection,
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    let todosList = [];
    querySnapshot.forEach((doc) => {
      const todoData = doc.data();
      todosList.push({ id: doc.id, ...todoData });
    });

    return todosList;
  } catch (error) {
    console.log("error:", error);
    return "Error fetching todos.";
  }
};

export const addTodoToDB = async (title, status, uid) => {
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      title,
      status,
      userId: uid,
      createdAt: serverTimestamp(),
    });

    if (docRef.id) {
      const res = { id: docRef.id, message: "Todo added successfully!" };
      return res;
    }
  } catch (error) {
    console.log("error:", error);
    return "Something went wrong. Try again.";
  }
};

export const updateTodoInDB = async (id, updatedTodo) => {
  try {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, updatedTodo);
    return "Todo updated successfully!";
  } catch (error) {
    console.log("error:", error);
    return "Something went wrong. Try again.";
  }
};

export const deleteTodoInDB = async (id) => {
  try {
    await deleteDoc(doc(db, "todos", id));
    return "Todo deleted successfully!";
  } catch (error) {
    console.log("error:", error);
    return "Something went wrong. Try again.";
  }
};
