import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
  });

  test("adds a new todo", async () => {
    render(<TodoList />);
    const input = screen.getByLabelText(/add todo input/i);
    const addButton = screen.getByText(/add/i);

    await userEvent.type(input, "New Todo");
    fireEvent.click(addButton);

    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  test("toggles todo completion", () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Learn React");

    expect(todoItem).toHaveStyle("text-decoration: none");

    fireEvent.click(todoItem);

    expect(todoItem).toHaveStyle("text-decoration: line-through");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const todoText = "Build a Todo App";
    const deleteButton = screen.getByLabelText(`delete todo ${todoText}`);

    fireEvent.click(deleteButton);

    expect(screen.queryByText(todoText)).not.toBeInTheDocument();
  });
});
