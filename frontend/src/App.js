// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { About } from './Components/About';
import { Add } from "./Components/Add";
import { Error } from './Components/Error';
import { Home } from "./Components/Home";
import { Login } from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import { Update } from "./Components/Update";


/*
//another way to route
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
      path:"/edit/:id",
      element:<Update/>,
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}
*/

function App() { 
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path = '/home' element={<Home/>}></Route>
        <Route path = '/' element={<Login/>}></Route>
        <Route path='/add' element={<ProtectedRoute element={Add} />} />
        <Route path='/about' element={<ProtectedRoute element={About} />} // Wrap About with ProtectedRoute
        /> 
        <Route path='/edit/:id' element={<ProtectedRoute element={Update} />} />
        <Route path='/*' element={<Error/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
