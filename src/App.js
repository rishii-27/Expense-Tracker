import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./SignUp";
import Welcome from "./Welcome";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: "/welcome",
      element: <Welcome />,
    },
  ]);

  return (
    <div className="container">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
