import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";

import Login from './screens/authentication/login';
import Dashboard from './screens/dashboard/dashboard';
import MovieDetails from './screens/movieDetails/movieDetails';
import Watchlist from './screens/watchlist/watchlist';
import MyProfile from './screens/myProfile/myProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "watchlist",
        element: <Watchlist />,
      },
      {
        path: "myProfile/",
        element: <MyProfile />,
      },
      {
        path: "movieDetails/",
        element: <MovieDetails />,
      },
    ],
  },
]);

function App() {
  const user = useSelector((state) => state.counter.value)
  if (!user) {
    return (
      <Login />
    );
  }
  return (
    <RouterProvider router={router} />
  );
}

export default App;
