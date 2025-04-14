import { useState } from "react";
import { TODO_CATEGORY_ICON } from "@/constants/icon";
import { IconButton } from "../ui/IconButton";
import Modal from "../ui/Modal";
import TodoForm from "./TodoForm";
import { createPortal } from "react-dom";
import { useTodos, useTodosDispatch } from "../../../contexts/TodoContext";

export const TodoItem = ({ setTodos, setFilteredTodos, todo }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDone, setIsDone] = useState(todo.category === "DONE");

  const todos = useTodos();
  console.log(todos);
  const dispatch = useTodosDispatch();

  const handleClickEdit = () => setIsOpenModal(true);
  const handleClickDelete = () => dispatch({ type: "DELETE", id: todo.id });

  const handledChecked = () => {
    if (isDone) {
      setIsDone(false);
    } else {
      setIsDone(true);
      todo.category = "DONE";

      dispatch({
        type: "UPDATE",
        updateTodo: { id, title, summary, category },
      });
    }
  };

  return (
    <>
      <li className="flex gap-4 justify-between my-4 py-4 px-4 border bg-gray-700 rounded-md shadow-xl group">
        <div className="flex gap-4 items-center">
          <input
            type="checkbox"
            className="peer hidden"
            id={`customCheckbox${todo.id}`}
            checked={isDone}
            onChange={handledChecked}
          />
          <label
            htmlFor={`customCheckbox${todo.id}`}
            className="w-4 h-4 border border-gray-400 peer-checked:bg-red-400 peer-checked:border-none cursor-pointer"
          />
          <div>
            <span className="text-lg font-medium text-gray-300">{TODO_CATEGORY_ICON.TODO}</span>
            <h2
              data-test="title"
              className={`mb-0 text-lg font-bold text-gray-100 uppercase ${
                isDone ? "line-through decoration-red-400" : ""
              }`}
            >
              {todo.title}
            </h2>
            <p
              className={`mt-2 text-base text-gray-200 ${
                isDone ? "line-through decoration-red-400" : ""
              }`}
            >
              {todo.summary}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <IconButton icon={"✏️"} onClick={handleClickEdit} />
          <IconButton className="text-red-300" icon={"🗑"} onClick={handleClickDelete} />
        </div>
      </li>
      {isOpenModal &&
        createPortal(
          <Modal setIsOpenModal={setIsOpenModal}>
            <TodoForm id={todo.id} todo={todo} setIsOpenModal={setIsOpenModal} />
          </Modal>,
          document.body
        )}
    </>
  );
};
