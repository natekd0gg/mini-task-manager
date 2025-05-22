import { expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import TaskList from "../pages/TaskList";

vi.mock("axios");
const mockedAxiosGet = axios.get as unknown as ReturnType<typeof vi.fn>;
const mockedAxiosPost = axios.post as unknown as ReturnType<typeof vi.fn>;
const mockedAxiosPut = axios.put as ReturnType<typeof vi.fn>;
const mockedAxiosDelete = axios.delete as unknown as ReturnType<typeof vi.fn>;

it("Views a list of all tasks", async () => {
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

it("Adds a new task", async () => {
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

it("Marks a task as complete", async () => {
  const mockTask = {
    id: "1",
    title: "Complete Me",
    description: "",
    created: new Date().toISOString(),
    complete: false,
  };

  mockedAxiosGet.mockResolvedValueOnce({ data: [mockTask] });
  mockedAxiosPut.mockResolvedValueOnce({});

  render(<TaskList />);

  const completeButton = await screen.findByTitle("Mark as Complete");
  fireEvent.click(completeButton);

  await waitFor(() =>
    expect(screen.getByText("Completed")).toBeInTheDocument()
  );
});

it("Delete a task", async () => {
  const mockTask = {
    id: "1",
    title: "Task to Delete",
    description: "",
    created: new Date().toISOString(),
    complete: false,
  };

  mockedAxiosGet.mockResolvedValueOnce({ data: [mockTask] });
  mockedAxiosDelete.mockResolvedValueOnce({});

  render(<TaskList />);

  await screen.findByText(mockTask.title);

  fireEvent.click(screen.getByTestId(`delete-button-${mockTask.id}`));

  fireEvent.click(
    screen.getByTestId("confirm-delete-button") || screen.getByText(/Confirm/i)
  );

  await waitFor(() => {
    expect(screen.queryByText(mockTask.title)).not.toBeInTheDocument();
  });
});

it("Filters the list by created date", async () => {
  const oldDate = "2020-01-01T00:00:00.000Z";
  const recentDate = new Date().toISOString();

  mockedAxiosGet.mockResolvedValueOnce({
    data: [
      {
        id: "1",
        created: oldDate,
        title: "Old Task",
        description: "This is an old task",
        complete: false,
        due: null,
      },
      {
        id: "2",
        created: recentDate,
        title: "Recent Task",
        description: "This is a recent task",
        complete: false,
        due: null,
      },
    ],
  });

  render(<TaskList />);

  await waitFor(() => {
    expect(screen.getByText("Old Task")).toBeInTheDocument();
    expect(screen.getByText("Recent Task")).toBeInTheDocument();
  });

  const fromDateInput = screen.getByLabelText(/From Date/i);

  fireEvent.change(fromDateInput, { target: { value: "2020-01-02" } });

  await waitFor(() => {
    expect(screen.queryByText("Old Task")).not.toBeInTheDocument();
    expect(screen.getByText("Recent Task")).toBeInTheDocument();
  });
});

it("Paginates a list of tasks if it is greater than 20", async () => {
  const tasks = [];

  for (let i = 0; i < 21; i++) {
    tasks.push({
      id: String(i),
      title: `Task ${i + 1}`,
      description: "",
      created: new Date().toISOString(),
      complete: false,
    });
  }

  mockedAxiosGet.mockResolvedValueOnce({ data: tasks });

  render(<TaskList />);

  expect(await screen.findByText("Task 1")).toBeInTheDocument();
  expect(screen.queryByText("Task 21")).not.toBeInTheDocument();

  fireEvent.click(screen.getByText("2"));
  expect(await screen.findByText("Task 21")).toBeInTheDocument();
});
