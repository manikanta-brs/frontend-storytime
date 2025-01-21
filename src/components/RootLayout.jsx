import { useSelector } from "react-redux";
import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RootLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="mt-5">
      {isLoggedIn && <NavigationBar />}
      <ToastContainer limit={1} />
      <Outlet />
    </div>
  );
};

export default RootLayout;
