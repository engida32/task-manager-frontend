import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TaskForm from "./components/CreateTask";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./components/RegisterComponents";
import Tasks from "./components/Tasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <NavBar />
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-task"
          element={
            <ProtectedRoute>
              <NavBar />

              <TaskForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-task/:id"
          element={
            <ProtectedRoute>
              <NavBar />

              <TaskForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
