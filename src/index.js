import React from 'react';
import ReactDOM from 'react-dom/client';
import { Ranking } from './pages/Ranking/Ranking';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from './pages/MainPage/MainPage';
import MyPlushies from './pages/MyPlushies/MyPlushies';
import { AuthProvider } from "react-auth-kit";
import Login from "./pages/Login/Login";
import createStore from 'react-auth-kit/createStore';
import Create from './pages/create/Create';
import Listall from './pages/Listall/Listall';
import Signup from './pages/Signup/Signup';
const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});
const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  {path: "Ranking",element: <Ranking />},
  {path: "MyPlushies",element: <MyPlushies/>},
  {path: "login",element: <Login />},
  {path: "create",element: <Create/>},
  {path: "Listall",element: <Listall/>},
  {path: "Signup",element: <Signup/>},
]);
/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<App />}></Route>
    </Routes>
  </BrowserRouter>*/
ReactDOM.createRoot(document.getElementById("root")).render(


<RouterProvider router={router} >
</RouterProvider>

 

);

