// Import the components and other
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import RootLayout from "./components/RootLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProfilePage from "./pages/ProfilePage";
import CategoriesPage from "./pages/CategoriesPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorStoriesPage from "./pages/AuthorStoriesPage";
import LibraryPage from "./pages/LibraryPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import CategoryStoriesPage from "./pages/CategoryStoriesPage";
import { ToastContainer, toast } from "react-toastify";

import Sidebar from "react-sidebar";
import SidebarPlayer from "./components/sidebar/SidebarPlayer";
import { useDispatch, useSelector } from "react-redux";
import {
  setStoryInfo,
  toggleSidebar,
  updateSpotifyToken,
} from "./store/user/authSlice";
import { useGetRefreshTokenAPIQuery } from "./store/user/userApiSlice";
import { useEffect, useState } from "react";
// import MediaPlayer from "./components/sidebar/MediaPlayer";

// Defining the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoginPage /> },
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
          // { path: "/player", element: <MediaPlayer /> },
          { path: "/categories", element: <CategoriesPage /> },
          { path: "/stories", element: <CategoryStoriesPage /> },
          { path: "/authors", element: <AuthorsPage /> },
          { path: "/authorstories", element: <AuthorStoriesPage /> },
          { path: "/library", element: <LibraryPage /> },
        ],
      },
    ],
  },
]);

function App() {
  // const [show, setShow] = useState(false);
  // const showSidebar = () => {
  //   setShow(!show);
  // };
  const [shouldFetchToken, setShouldFetchToken] = useState(false);
  const { isSidebarOpen, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    data: spotifyToken,
    isLoading: spotifyTokenLoading,
    refetch: refetchSpotifyToken,
  } = useGetRefreshTokenAPIQuery(null, { skip: !shouldFetchToken });

  const showSidebar = () => {
    dispatch(setStoryInfo({ s_id: null, s_name: null }));
    dispatch(toggleSidebar());
  };

  useEffect(() => {
    if (spotifyToken) {
      dispatch(updateSpotifyToken({ spotifyToken: spotifyToken.spotifyToken }));
    }
  }, [spotifyToken]);
  useEffect(() => {
    console.log("refresh token logic...");
    if (!isLoggedIn) {
      setShouldFetchToken(false);
      return;
    }
    setShouldFetchToken(true);
    // const refreshInterval = 10 * 1000; // 10 seconds
    const refreshInterval = 600 * 1000;

    const intervalId = setInterval(() => {
      refetchSpotifyToken();
      console.log("refetched token");
    }, refreshInterval);
    return () => clearInterval(intervalId);
  }, [refetchSpotifyToken, isLoggedIn]);
  return (
    <>
      {/* <ToastContainer /> */}
      {/* <button className="mt-8" onClick={showSidebar}>
        Player
      </button> */}
      {isSidebarOpen && (
        <Sidebar
          sidebar={<SidebarPlayer />}
          open={isSidebarOpen}
          children={<></>}
          onSetOpen={showSidebar}
          pullRight={true}
          sidebarClassName="shadow-none fixed z-40"
        />
      )}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
