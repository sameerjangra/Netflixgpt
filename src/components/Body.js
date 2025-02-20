import Login from './Login';
import Browse from './Browse';
import { RouterProvider, createBrowserRouter } from 'react-router';

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element : <Login />
        },
        {
            path:"/browse",
            element : <Browse />
        },
    ]);

  return (
    <RouterProvider router={appRouter} />
  )
}

export default Body