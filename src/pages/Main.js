import { useEffect, useState } from "react";

import Header from "../components/Header";
import InputTodo from "../components/InputTodo";
import TodoList from "../components/TodoList";
import Dropdown from "../components/Dropdown";
import { SearchContextProvider } from "../contexts/SearchContext";
import { getTodoList } from "../api/todo";

const Main = () => {
  const [todoListData, setTodoListData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <SearchContextProvider>
          <InputTodo setTodos={setTodoListData} />
          <Dropdown isOpen={true} />
          <TodoList todos={todoListData} setTodos={setTodoListData} />
        </SearchContextProvider>
      </div>
    </div>
  );
};

export default Main;
