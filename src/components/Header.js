import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import {
  useAddTodosMutation,
  useAllCompleteMutation,
  useDeleteAllTodosMutation,
  useGetTodosQuery,
} from "../features/api/apiSlice";

export default function Header() {
  const { data: todos } = useGetTodosQuery({ colors: "", status: "" });
  const [addTodos, { isError, isLoading, isSuccess }] = useAddTodosMutation();

  const [
    allComplete,
    {
      isError: allCompleteError,
      isLoading: allCompleteIsLaoding,
      isSuccess: allCompleteSuccess,
    },
  ] = useAllCompleteMutation();
  const [
    deleteAllTodos,
    {
      isError: deleteError,
      isLoading: deleteLoading,
      isSuccess: deleteSuccess,
    },
  ] = useDeleteAllTodosMutation();

  const [input, setInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    addTodos({
      text: input,
      completed: false,
      color: "",
    });
    setInput("");
    toast.success("Todo added Successfully");
  };

  const completeHandler = () => {
    todos.forEach((todo) =>
      allComplete({ id: todo.id, data: { ...todo, completed: true } })
    );
    toast.success("Completed All Tasks");
  };

  const handleStatusClear = () => {
    const clearCompletedTodos = todos?.filter((todo) => todo.completed);
    clearCompletedTodos.forEach((element) => {
      deleteAllTodos({ id: parseInt(element.id) });
    });
    toast.success("Clear Completed Todos");
  };

  return (
    <div>
      <form
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
        onSubmit={submitHandler}
      >
        <img src={noteImage} className="w-6 h-6" alt="Add todo" />
        <input
          type="text"
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
        ></button>
      </form>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && isError && <h1>There was something wrong</h1>}
      {isSuccess && <ToastContainer />}
      {allCompleteIsLaoding && <h1>Loading...</h1>}
      {!allCompleteIsLaoding && allCompleteError && (
        <h1>There was something wrong...</h1>
      )}
      {allCompleteSuccess && <ToastContainer />}
      {deleteLoading && <h1>Loading...</h1>}
      {!deleteLoading && deleteError && <h1>There was something wrong...</h1>}
      {deleteSuccess && <ToastContainer />}

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li className="flex space-x-1 cursor-pointer" onClick={completeHandler}>
          <img className="w-4 h-4" src={tickImage} alt="Complete" />
          <span>Complete All Tasks</span>
        </li>
        <li className="cursor-pointer" onClick={handleStatusClear}>
          Clear completed
        </li>
      </ul>
    </div>
  );
}
