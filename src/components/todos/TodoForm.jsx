import { TODO_CATEGORY_ICON } from "@/constants/icon";
import { useState } from "react";
import { useTodosDispatch } from "../../../contexts/TodoContext";
const TodoForm = ({ id, todo, setIsOpenModal }) => {
  const [title, setTitle] = useState(id !== undefined ? todo.title : "");
  const [summary, setSummary] = useState(id !== undefined ? todo.summary : "");
  const [category, setCategory] = useState(
    id !== undefined ? todo.category : "TODO"
  );

  const dispatch = useTodosDispatch();

  const handleClickCancel = () => {
    setIsOpenModal(false);
  };

  const handleClickAdd = () => {
    // onAdd(title, summary, category);
    dispatch({
      type: "ADD",
      newTodo: { id: self.crypto.randomUUID(), title, summary, category },
    });
    setIsOpenModal(false);
  };

  const handleClickEdit = () => {
    // onEdit(id, title, summary, category);
    dispatch({
      type: "UPDATE",
      updateTodo: { id, title, summary, category },
    });
    setIsOpenModal(false);
  };

  return (
    <>
      <h3 className="text-3xl text-red-200">
        {id !== undefined ? "Edit Todo" : "New Todo"}
      </h3>
      <form className="my-2">
        <div>
          <label className="block mb-2 text-xl text-white" htmlFor="title">
            Title
          </label>
          <input
            className="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-xl text-white" htmlFor="summary">
            Summary
          </label>
          <textarea
            className="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
            id="summary"
            rows="5"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-xl text-white" htmlFor="category">
            Category
          </label>
          <select
            className="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="TODO">{TODO_CATEGORY_ICON.TODO} To do</option>
            <option value="PROGRESS">
              {TODO_CATEGORY_ICON.PROGRESS} On progress
            </option>
            <option value="DONE">{TODO_CATEGORY_ICON.DONE} Done</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="text-xl text-white"
            type="button"
            onClick={handleClickCancel}
          >
            Cancel
          </button>
          {id !== undefined ? (
            <button
              className="px-6 py-3 text-xl text-red-200"
              type="button"
              onClick={handleClickEdit}
            >
              Edit
            </button>
          ) : (
            <button
              className="px-6 py-3 text-xl text-red-200"
              type="button"
              onClick={handleClickAdd}
            >
              Add
            </button>
          )}
        </div>
      </form>
    </>
  );
};
export default TodoForm;
