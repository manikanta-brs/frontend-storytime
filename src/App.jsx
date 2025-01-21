import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import RootLayout from "./components/RootLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CategoriesPage from "./pages/categoriesPage";
import ErrorPage from "./pages/ErrorPage";
import AuthorsPage from "./pages/AuthorsPage";
import LibraryPage from "./pages/LibraryPage";
import AuthorStoriesPage from "./pages/AuthorStoriesPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EmailVerifyPage from "./pages/EmailVerifyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LoginPage />, errorElement: <h1>Error!</h1> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forgotpassword", element: <ForgotPasswordPage /> },
      { path: "/resetpassword/:token", element: <ResetPasswordPage /> },
      { path: "/verifyemail/:verifytoken", element: <EmailVerifyPage /> },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/home", element: <HomePage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/categories", element: <CategoriesPage /> },
          { path: "/library", element: <LibraryPage /> },
          { path: "/authors", element: <AuthorsPage /> },
          { path: "/authorsstories", element: <AuthorStoriesPage /> },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
// import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import ProfilePage from "./pages/ProfilePage";
// import RootLayout from "./components/RootLayout";
// import ProtectedRoutes from "./components/ProtectedRoutes";
// import CategoriesPage from "./pages/categoriesPage";
// import ErrorPage from "./pages/ErrorPage";
// import AuthorsPage from "./pages/AuthorsPage";
// import LibraryPage from "./pages/LibraryPage";
// import AuthorStoriesPage from "./pages/AuthorStoriesPage";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import ResetPasswordPage from "./pages/ResetPasswordPage";
// import EmailVerifyPage from "./pages/EmailVerifyPage";
// import { Provider } from "react-redux";
// import store from "./store/store"; // Assuming you have the Redux store defined here

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, element: <Navigate to="/login" replace /> },
//       { path: "/login", element: <LoginPage /> },
//       { path: "/register", element: <RegisterPage /> },
//       { path: "/forgotpassword", element: <ForgotPasswordPage /> },
//       { path: "/resetpassword/:token", element: <ResetPasswordPage /> },
//       { path: "/verifyemail/:verifytoken", element: <EmailVerifyPage /> },
//       {
//         element: <ProtectedRoutes />,
//         children: [
//           { path: "/home", element: <HomePage /> },
//           { path: "/profile", element: <ProfilePage /> },
//           { path: "/categories", element: <CategoriesPage /> },
//           { path: "/library", element: <LibraryPage /> },
//           { path: "/authors", element: <AuthorsPage /> },
//           {
//             path: "/authors/:authorId/stories",
//             element: <AuthorStoriesPage />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

// function App() {
//   return (
//     <Provider store={store}>
//       {" "}
//       {/* Make sure the Provider wraps your app */}
//       <RouterProvider router={router} />
//     </Provider>
//   );
// }

// export default App;
