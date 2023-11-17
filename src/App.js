import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./SignUp";
import Welcome from "./Welcome";
import UpdateProfile from "./UpdateProfile";
import { StoreContextProvider } from "./StoreContext";
import ForgotPassword from "./ForgetPassword";

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
    {
      path: "/complete",
      element: <UpdateProfile />,
    },
    {
      path: "/logout",
      element: <SignUp />,
    },
    {
      path: "/forgetPassword",
      element: <ForgotPassword />,
    },
  ]);

  return (
    <StoreContextProvider>
      <div className="container">
        <RouterProvider router={routes} />
      </div>
    </StoreContextProvider>
  );
}

export default App;
