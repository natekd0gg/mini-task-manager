import { expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import TaskList from "../pages/TaskList";

vi.mock("axios");
const mockedAxiosGet = axios.get as unknown as ReturnType<typeof vi.fn>;
const mockedAxiosPost = axios.post as unknown as ReturnType<typeof vi.fn>;

// 1. Fetches Tasks
it("fetches and displays tasks", async () => {
  const mockTasks = [
    {
      id: "1",
      title: "Test Task",
      description: "This is a test",
      created: new Date().toISOString(),
      complete: false,
    },
  ];

  mockedAxiosGet.mockResolvedValueOnce({ data: mockTasks });

  render(<TaskList />);

  expect(await screen.findByText("Test Task")).toBeInTheDocument();
  expect(screen.getByText("This is a test")).toBeInTheDocument();
});

// 2. Adds a new task
it("adds a new task", async () => {
  mockedAxiosGet.mockResolvedValueOnce({ data: [] });

  const newTask = {
    id: "999",
    title: "New Task",
    description: "Test desc",
    created: new Date().toISOString(),
    complete: false,
  };

  mockedAxiosPost.mockResolvedValueOnce({ data: newTask });

  render(<TaskList />);

  fireEvent.click(screen.getByText(/Create New Task/i));

  fireEvent.change(screen.getByTestId("input-title"), {
    target: { value: newTask.title },
  });

  fireEvent.change(screen.getByTestId("input-description"), {
    target: { value: newTask.description },
  });

  fireEvent.click(screen.getByTestId("btn-submit"));

  await waitFor(() => {
    expect(screen.getByText(newTask.title)).toBeInTheDocument();
  });
});
