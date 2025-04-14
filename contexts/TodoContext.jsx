import { createContext, useContext, useReducer } from "react";

// 할일 데이터를 제공하는 컨텍스트
export const TodoContext = createContext();

// 할일 상태 변경(dispatch) 로직들을 제공하는 컨텍스트(useReducer와 관련)
export const TodoDispatchContext = createContext();

const dummyTodos = [
  {
    id: 1,
    title: "React 공부",
    summary: "React를 공부한다.",
    category: "TODO",
  },
  {
    id: 2,
    title: "점심 먹기",
    summary: "점심을 먹는다.",
    category: "PROGRESS",
  },
  {
    id: 3,
    title: "커피 마시기",
    summary: "커피를 마신다.",
    category: "DONE",
  },
];

// TodoContext와 TodoDispatchContext를 감싼(Wraping) 컴포넌트(추상화)
export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, {
    data: dummyTodos,
    category: "ALL",
  });

  return (
    <TodoContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>{children}</TodoDispatchContext.Provider>
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
export const useTodosDispatch = () => useContext(TodoDispatchContext);

const reducer = (todos, action) => {
  const { data, category } = todos;
  switch (action.type) {
    case "ADD":
      return { data: [...data, action.newTodo], category };

    case "UPDATE":
      return {
        data: data.map((todo) =>
          todo.id === action.updateTodo.id ? { ...action.updateTodo } : todo
        ),
        category,
      };

    case "DELETE":
      return { data: data.filter((todo) => todo.id !== action.id), category };

    case "FILTER":
      return { data, category: action.selectedCategory };

    default:
      return todos;
  }
};
