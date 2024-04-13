import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Signup } from "./views";
import { ParentForm, ProfessorForm } from "./components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>error</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
    children: [
      {
        path: "",
        element: <></>,
      },
      {
        path: "professor",
        element: <ProfessorForm />,
      },
      {
        path: "parent",
        element: <ParentForm />,
      },
    ],
  },
]);
function App() {
  return <></>;
}

export default App;
