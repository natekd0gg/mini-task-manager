## Setup Instructions

1. **Backend Setup**  
    Navigate into the `task-api` directory:

   ```bash
   cd task-api
   npm install
   npm run start
   ```

   Alternatively, you can run the run.sh script ./run.sh

   The backend will be running at: http://localhost:3001

2. **Frontend Setup**
   Navigate into the task-frontend directory:

   ```bash
   cd task-frontend
   npm install
   npm run dev
   ```

   The frontend will be available at: http://localhost:5173

## Design Decisions

### Styling

Tailwind CSS was chosen for styling due to its utility-first approach, enabling rapid UI development with minimal custom CSS.

### Pages

- **SplashScreen**: initial landing page
- **TaskList**: main page displaying tasks, handling fetching, rendering, and task management UI.

### Components

- **AddTaskModal**: A modal component dedicated to creating new tasks
- **DeleteTaskModal**: Handles task deletion confirmation
- **DateRangeFilter**: Enables filtering tasks based on creation dates
- **Pagination**: Manages task list pagination when there are many tasks

Ideal to separates concerns and promote reusable components throughout the app.

## How to Run Unit Tests

Unit testing is set up using **React Testing Library** and **Vitest** to cover all core functional requirements:

- View a list of all tasks
- Add a new task
- Mark a task as complete
- Delete a task
- Filter the list by created date (range filter)
- Display pagination if there are more than 20 tasks

To run the tests, navigate to the `task-frontend` directory and run:

`npm run test`
