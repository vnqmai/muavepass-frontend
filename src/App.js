import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DemoPayOS from "./pages/DemoPayOS";
import Payment from "./pages/Payment";
import Result from "./pages/Result";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DemoPayOS />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/result",
    element: <Result />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
