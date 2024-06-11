import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/RegisterComponents";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div>
      {/* <Login />{" "} */}
      {/* <AuthProvider>e */}
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;
