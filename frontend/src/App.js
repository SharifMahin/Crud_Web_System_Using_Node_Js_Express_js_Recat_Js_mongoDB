import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import { Add } from "./Components/Add";
import { Home } from "./Components/Home";
import { Update } from "./Components/Update";

function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<Home/>,
    },
    {
      path:"/add",
      element:<Add/>,
    },
    {
      path:"/edit",
      element:<Update/>,
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
