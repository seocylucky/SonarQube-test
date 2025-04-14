import { useContext, useState } from "react";
import TodoFilter from "./TodoFilter";
import Modal from "../ui/Modal";
import { createPortal } from "react-dom";
import TodoForm from "./TodoForm";
import { TodoContext } from "../../../contexts/TodoContext";

const TodoHeader = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { todos, setTodos } = useContext(TodoContext);

  const handleModal = () => {
    setIsOpenModal(true);
  };

  return (
    <div className="flex items-center justify-between mb-2" id="task-control">
      <button
        onClick={handleModal}
        className="px-6 py-2 font-semibold text-gray-100 bg-gray-800 border-none rounded cursor-pointer"
        data-cy="add-todo-button"
      >
        Add Todo
      </button>
      {isOpenModal &&
        createPortal(
          <Modal setIsOpenModal={setIsOpenModal}>
            <TodoForm setIsOpenModal={setIsOpenModal} todos={todos} />
          </Modal>,
          document.body
        )}
      <TodoFilter />
    </div>
  );
};
export default TodoHeader;
