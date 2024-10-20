import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import './styles/global.css';
import { AuthWrapper } from './components/context/auth.context.jsx';
import UserPage from './pages/user.jsx';
import ProductsPage from './pages/book.jsx';
import { Children } from 'react';
import TodoApp from './components/todo/TodoApp.jsx';
import ErrorPage from './pages/error.jsx';
import BookPage from './pages/book.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children : [
      {
        index: true,
        element: <TodoApp/>
      },
      {
        path: "/user",
        element: <UserPage />
      },
      {
        path: "/book",
        element: <BookPage />
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
  // </React.StrictMode>,
)
