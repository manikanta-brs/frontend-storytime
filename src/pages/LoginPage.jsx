import { Link, NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/user/authSlice";
import { useLoginAPIMutation } from "../store/user/userApiSlice";
import { toast } from "react-toastify";

const initialValues = {
  email: "",
  password: "",
  rememberme: false,
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [loginAPI] = useLoginAPIMutation();
  const [apiError, setApiError] = useState(""); // State to hold error messages
  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [navigate, isLoggedIn]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setApiError(""); // Clear any previous error messages
    try {
      // Make the login API call
      const response = await loginAPI({
        email: values.email,
        password: values.password,
      }).unwrap();

      // If the response is a string (like 'Verification email sent')
      if (typeof response === "string") {
        toast.success(response); // Display the message
      } else {
        // If it's a JSON object, handle it normally
        toast.success("You logged in successfully");
        dispatch(login({ ...response }));
        navigate("/home");
        resetForm(); // Reset form after successful login
      }
    } catch (error) {
      // Log the error for debugging
      toast.warn(error);

      // Handle any errors (API errors, unexpected responses)
      toast.error(
        error?.data?.message || error.error || "Something went wrong!"
      );
      resetForm(); // Optionally reset form on error (if needed)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="grid place-items-center mb-3">
        <img src="/images/logo.svg" alt="stroytimelogo" className="w-16 h-16" />
      </div>
      <div className="Auth-form-container">
        <div className="Auth-form">
          <div className="Auth-form-content">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values }) => (
                <Form noValidate>
                  <h3 className="Auth-form-title py-4 text-center">Sign In</h3>
                  <hr />
                  <div className="form-group mt-3 px-5 py-2 border border-gray-300 rounded-lg mx-5">
                    <label>Email</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="bg-gray-50 border-0 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block bg-white w-full p-2.5 px-0 outline-0"
                    />
                    <ErrorMessage
                      className="err_msg"
                      name="email"
                      component="div"
                    />
                  </div>
                  <div className="form-group mt-5 px-5 py-5 border border-gray-300 rounded-lg mx-5">
                    <label>Password</label>
                    <Field
                      name="password"
                      placeholder="Password"
                      type={showPassword ? "password" : "text"}
                      className="bg-gray-50 border-0 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-0 bg-white outline-0"
                    />
                    <ErrorMessage
                      className="err_msg"
                      name="password"
                      component="div"
                    />
                  </div>

                  <div className="p-3 px-5">
                    {/* Show/Hide Password Toggle */}
                    <div className="flex items-center mt-3">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          id="checkbox"
                          className="sr-only peer"
                          onClick={togglePasswordVisibility}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {showPassword ? "Show Password " : "Hide Password"}
                        </span>
                      </label>
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="flex justify-between items-center mt-3">
                      {/* Remember Me Checkbox */}
                      <div className="flex items-center">
                        <Field
                          name="rememberme"
                          type="checkbox"
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="rememberme"
                          className="ml-2 text-sm text-gray-900 rounded"
                        >
                          Remember me
                        </label>
                        {/* Checkbox Status */}
                      </div>

                      {/* Forgot Password Link */}
                      <div className="text-sm">
                        <Link
                          className="font-medium linkColor hover:text-purple-500"
                          to={"/forgotpassword"}
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </div>
                  </div>

                  {apiError && (
                    <div className="text-red-500 text-sm text-center mt-3">
                      {apiError}
                    </div>
                  )}

                  <div className="d-grid gap-2 mt-7 px-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`block w-full py-2 px-4 rounded-xl btnPurpleColor ${
                        isSubmitting
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-700 text-white font-bold"
                      }`}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="mt-3">
                    <div className="text-center text-sm text-black py-6 bg-gray-300 rounded-b-xl bg-opacity-20">
                      You don't have an account?
                      <NavLink
                        className="greyColor font-medium text-purple-600 hover:text-purple-500 text-center py-2 ml-3 linkColor"
                        to={"/register"}
                      >
                        Sign Up
                      </NavLink>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
