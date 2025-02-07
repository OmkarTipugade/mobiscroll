# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Instructions for Running the Project

1. **Install Dependencies**: Run the following command to install the required dependencies:
    ```sh
    npm install
    ```

2. **Start Development Server**: Run the following command to start the development server:
    ```sh
    npm run dev
    ```

3. **Build for Production**: Run the following command to build the project for production:
    ```sh
    npm run build
    ```

4. **Preview Production Build**: Run the following command to preview the production build:
    ```sh
    npm run preview
    ```

## Implemented Features

- **Calendar Component**: Displays a calendar with navigation for previous and next months.
- **Resource List**: Allows adding and displaying a list of resources.
- **Schedule Table**: Displays a schedule table with events for each resource and day.
- **Event Management**: Supports adding, dragging, and resizing events within the schedule table.
- **Local Storage**: Persists events in local storage to maintain state across page reloads.

## Usage Guidelines

- **Adding Resources**: Use the input field in the [ResourceList](http://_vscodecontentref_/1) component to add new resources. Press "Enter" or click the "Add" button to add the resource.
- **Navigating Calendar**: Use the arrow buttons or the "Today" button in the [Index](http://_vscodecontentref_/2) component to navigate through months.
- **Adding Events**: Double-click on a cell in the [ScheduleTable](http://_vscodecontentref_/3) to add a new event. Enter the event name in the prompt.
- **Dragging Events**: Drag and drop events between cells to move them to different days or resources.
- **Resizing Events**: Click and drag the handles on the sides of an event to resize it.
- **Deleting Events**: Select an event and press the "Delete" key to remove it. A popup message will confirm the deletion.
