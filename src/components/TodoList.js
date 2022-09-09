import { useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/api/apiSlice";
import Todo from "./Todo";

export default function TodoList() {
  const { status, colors } = useSelector((state) => state.filter);
  const {
    data: todos,
    isLoading,
    isError,
  } = useGetTodosQuery({ colors: colors, status: status });

  // const filterByStatus = (todo) => {
  //   switch (status) {
  //     case "Complete":
  //       return todo.completed;

  //     case "Incomplete":
  //       return !todo.completed;

  //     default:
  //       return true;
  //   }
  // };

  // const filterByColors = (todo) => {
  //   if (colors.length > 0) {
  //     return colors.includes(todo?.color);
  //   }
  //   return true;
  // };
  let content = null;
  if (isLoading) {
    content = <h1>Loading</h1>;
  }
  if (!isLoading && isError) {
    content = <h1>There was something wrong</h1>;
  }
  if (!isLoading && !isError && todos.length > 0) {
    content = todos
      // .filter(filterByStatus)
      // .filter(filterByColors)
      .map((todo) => <Todo todo={todo} key={todo.id} />);
  }
  if (!isLoading && !isError && todos.length === 0) {
    content = <h1>Todos Not Found</h1>;
  }
  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      {content}
    </div>
  );
}
