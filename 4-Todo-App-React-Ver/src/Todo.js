import "./Todo.css";

import { useState } from "react";
import cn from "classnames";

let maxId = 0;

export default function Todo() {
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState([]);
  const [desc, setDesc] = useState(true);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleClick = () => {
    setTodo([
      ...todo,
      {
        id: ++maxId,
        title,
        created: new Date(),
        isDone: false,
      },
    ]);
  };

  const handleDone = (e) => {
    setTodo(
      todo.map((item) => {
        if (item.id === Number(e.target.dataset.id)) {
          return {
            ...item,
            isDone: true,
          };
        } else {
          return item;
        }
      }),
    );
  };

  const handleRemove = (e) => {
    setTodo(todo.filter((item) => item.id !== Number(e.target.dataset.id)));
  };

  const handleSort = (e) => {
    const sorted = [...todo];
    sorted.sort((m, n) => {
      if (desc) {
        return n.created.getTime() - m.created.getTime();
      } else {
        return m.created.getTime() - n.created.getTime();
      }
    });

    setDesc((d) => !d);
    setTodo(sorted);
  };

  return (
    <>
      <div className="form">
        <label>
          ToDo :&nbsp;
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChangeTitle}
          />
        </label>
        &nbsp;
        <button type="button" onClick={handleClick}>
          Add
        </button>
        &nbsp;
        <button type="button" onClick={handleSort}>
          Sort ({desc ? "↑" : "↓"})
        </button>
      </div>
      <hr />

      <div className="displayTodo">
        <ul>
          {todo.map((item) => (
            <li
              className={cn("todo-card", item.isDone ? "done" : "")}
              key={item.id}
            >
              <>{item.title}</>
              <div className="button-group">
                <button type="button" onClick={handleDone} data-id={item.id}>
                  Done
                </button>
                &nbsp;
                <button type="button" onClick={handleRemove} data-id={item.id}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
