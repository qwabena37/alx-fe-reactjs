import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a Todo App", completed: true },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h2>Todo List</h2>

      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          aria-label="Add todo input"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(({ id, text, completed }) => (
          <li
            key={id}
            onClick={() => toggleTodo(id)}
            style={{ 
              textDecoration: completed ? "line-through" : "none",
              cursor: "pointer"
            }}
            data-testid={`todo-item-${id}`}
          >
            {text}{" "}
            <button
              aria-label={`delete todo ${text}`}
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
