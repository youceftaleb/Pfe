import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Signup } from "./views";

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
  },
]);
function App() {
  return <></>;
}

export default App;
