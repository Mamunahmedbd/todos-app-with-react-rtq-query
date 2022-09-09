import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import cancelImage from "../assets/images/cancel.png";
import {
  useColorChangeMutation,
  useDeleteTodoMutation,
  useStatusChangeMutation,
  useUpdateTextMutation,
} from "../features/api/apiSlice";

export default function Todo({ todo }) {
  const { text, id, completed, color } = todo;
  const [updatedInput, setUpdatedInput] = useState();
  const [isEditable, setIsEditable] = useState(false);

  // those are RTK Query Mutation
  const [deleteTodo, { isError, isLoading, isSuccess }] =
    useDeleteTodoMutation();
  const [
    statusChange,
    { isError: statusChangeIsError, isLoading: statusChangeIsLoading },
  ] = useStatusChangeMutation();
  const [
    colorChange,
    { isError: colorChangeIsError, isLoading: colorChangeIsLoading },
  ] = useColorChangeMutation();
  const [
    updateText,
    {
      isError: updateTextError,
      isLoading: updateTextIsLoading,
      isSuccess: updatedInputIsSuccess,
    },
  ] = useUpdateTextMutation();

  // Those are handler
  const handleStatusChange = (todoId) => {
    statusChange({
      id: todoId,
      data: {
        completed: !completed,
      },
    });
  };
  const handleColorChange = (todoId, color) => {
    colorChange({ id: todoId, data: { color: color } });
  };
  const handleDelete = (todoId) => {
    deleteTodo(todoId);
    toast.info("Todo Delete Successfully");
  };
  const handleEditable = () => {
    setIsEditable(!isEditable);
    setUpdatedInput(text);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateText({
      id,
      data: {
        text: updatedInput,
      },
    });
    setIsEditable(!isEditable);
    toast.success("Updated");
  };

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <div
        className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed && "border-green-500 focus-within:border-green-500"
        }`}
      >
        <input
          type="checkbox"
          checked={completed}
          onChange={() => handleStatusChange(id)}
          className="opacity-0 absolute rounded-full"
        />
        {completed && (
          <svg
            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      {isEditable ? (
        <div className="select-none flex-1">
          <div className="flex items-center border-b border-teal-500 py-2">
            <form onSubmit={handleSubmit}>
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                value={updatedInput}
                onChange={(e) => setUpdatedInput(e.target.value)}
              />
            </form>
          </div>
        </div>
      ) : (
        <>
          <svg
            onClick={() => {
              handleEditable(id);
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <div className={`${!completed && "line-through"} select-none flex-1`}>
            {text}
          </div>
        </>
      )}

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
          color === "green" && "bg-green-500"
        }`}
        onClick={() => handleColorChange(id, "green")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
          color === "yellow" && "bg-yellow-500"
        }`}
        onClick={() => handleColorChange(id, "yellow")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
          color === "red" && "bg-red-500"
        }`}
        onClick={() => handleColorChange(id, "red")}
      ></div>

      <img
        src={cancelImage}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
        onClick={() => handleDelete(id)}
      />
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && isError && <h1>There was something Error...</h1>}
      {isSuccess && <ToastContainer />}
      {statusChangeIsLoading && <h1>Loading...</h1>}
      {!statusChangeIsLoading && statusChangeIsError && (
        <h1>There was something Error...</h1>
      )}
      {colorChangeIsLoading && <h1>Loading...</h1>}
      {!colorChangeIsLoading && colorChangeIsError && (
        <h1>There was something Error...</h1>
      )}
      {updateTextIsLoading && <h1>Loading...</h1>}
      {!updateTextIsLoading && updateTextError && (
        <h1>There was something Error...</h1>
      )}
      {updatedInputIsSuccess && <ToastContainer />}
    </div>
  );
}
