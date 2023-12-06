import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./SignUp";
import Welcome from "./Welcome";
import UpdateProfile from "./UpdateProfile";
import ForgotPassword from "./ForgetPassword";
import { Provider } from "react-redux";
import store from "./Redux/store";

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
    <Provider store={store}>
      <div className="container">
        <RouterProvider router={routes} />
      </div>
    </Provider>
  );
}

export default App;
