import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import Modal from "react-responsive-modal";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "react-responsive-modal/styles.css";
import { useRegisterAPIMutation } from "../store/user/userApiSlice";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};
const validationSchema = Yup.object().shape({
  first_name: Yup.string() // Fix the typo here
    .required("First Name is required")
    .min(3, "First Name must be at least 3 characters")
    .max(15, "First Name must not exceed 15 characters"),
  last_name: Yup.string()
    .required("Last Name is required")
    .min(3, "Last Name must be at least 3 characters")
    .max(15, "Last Name must not exceed 15 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password must not exceed 15 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  acceptTerms: Yup.bool().oneOf([true], "Please accept terms & conditions"),
});
const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerAPI, { isLoading }] = useRegisterAPIMutation();

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  // const handleSubmit = async (values, { setSubmitting, resetForm }) => {

  //   setSubmitting(true);
  //   try {
  //     const response = await registerAPI({
  //       first_name: values.first_name,
  //       last_name: values.last_name,
  //       email: values.email,
  //       password: values.password,
  //     });
  //     toast.success(response?.data?.message || "Registration successful");
  //     resetForm();
  //     setSubmitting(false);
  //     navigate("/login");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(
  //       error?.data?.message || error.error || "Something went wrong!"
  //     );
  //   }
  // };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const response = await registerAPI({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
      });
      toast.success(
        "Registration successful! A confirmation email has been sent."
      );
      resetForm();
      setSubmitting(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.data?.message || error.error || "Something went wrong!"
      );
      setSubmitting(false);
    }
  };

  // logic to show hide password
  const [showPassword, setShowPassword] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="grid place-items-center mb-3">
        <img className="w-16 h-16" src="/images/logo.svg" alt="Workflow" />
      </div>
      <div className="Auth-form-container">
        <div className="Auth-form">
          <div className="Auth-form-content">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, isSubmitting }) => (
                <Form>
                  <h3 className="Auth-form-title py-2 text-center">Sign Up</h3>
                  <hr />

                  <div className="form-group mt-5 px-5 py-2 border border-gray-300 rounded-lg mx-5">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="bg-gray-50 border-0 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-0 bg-white outline-0"
                    />
                  </div>
                  <div className="px-5 pt-2">
                    <ErrorMessage
                      className="err_msg"
                      name="email"
                      component="div"
                    />
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <div className="form-group mt-3 px-5 py-2 border border-gray-300 rounded-lg mx-5">
                        <Field
                          type="text"
                          name="first_name"
                          placeholder="First Name"
                          className="bg-gray-50 border-0 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-0 bg-white outline-0"
                        />
                      </div>
                      <div className="px-5 pt-2">
                        <ErrorMessage
                          className="err_msg"
                          name="first_name"
                          component="div"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="form-group mt-3 px-5 py-2 border border-gray-300 rounded-lg mx-5">
                        <Field
                          type="text"
                          name="last_name"
                          placeholder="Last Name"
                          className="bg-gray-50 border-0 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-0 bg-white outline-0"
                        />
                      </div>
                      <div className="px-5 pt-2">
                        <ErrorMessage
                          className="err_msg"
                          name="last_name"
                          component="div"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-3 px-5 py-2 border border-gray-300 rounded-lg mx-5">
                    <Field
                      type={showPassword ? "password" : "text"}
                      name="password"
                      placeholder="Password"
                      className="bg-gray-50 border-0 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-0 bg-white outline-0"
                    />
                  </div>
                  <div className="px-5 pt-2">
                    <ErrorMessage
                      className="err_msg"
                      name="password"
                      component="div"
                    />
                  </div>

                  <div className="form-group mt-3 px-5 py-2 border border-gray-300 rounded-lg mx-5">
                    <Field
                      type={showPassword ? "password" : "text"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="bg-gray-50 border-0 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-0 bg-white outline-0"
                    />
                  </div>
                  <div className="px-5 pt-2">
                    <ErrorMessage
                      className="err_msg"
                      name="confirmPassword"
                      component="div"
                    />
                  </div>
                  {/* Show/Hide Password Toggle Below */}
                  <div className="p-3 px-5">
                    <div className="flex items-center mt-3">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          onClick={togglePasswordVisibility}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {showPassword ? "Show Password " : "Hide Password"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 px-5">
                    <div className="flex items-center">
                      <Field
                        id="acceptTerms"
                        name="acceptTerms"
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="acceptTerms"
                        className="ml-2 text-sm text-gray-900 rounded"
                      >
                        &nbsp;I agree with
                        <span
                          className="no-underline hover:underline cursor-pointer "
                          onClick={onOpenModal}
                        >
                          Terms & Conditions
                        </span>
                      </label>
                      &nbsp; &nbsp;
                      <ErrorMessage
                        className="err_msg"
                        name="acceptTerms"
                        component="div"
                      />
                      <div>{values.acceptTerms ? "Checked" : "Unchecked"}</div>
                    </div>
                  </div>

                  <div className="d-grid gap-2 mt-2 px-5 mb-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`block w-full bg-blue-500 py-2 px-4 rounded-xl btnPurpleColor ${
                        isSubmitting
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-700 text-white font-bold"
                      }`}
                    >
                      Continue
                    </button>
                  </div>

                  <div className="text-center text-sm text-black py-6 bg-gray-300 rounded-b-xl bg-opacity-20">
                    Already registered?
                    <NavLink
                      className="greyColor font-medium text-purple-600 hover:text-purple-500 text-center py-2 ml-3 linkColor"
                      to="/login"
                    >
                      Sign In
                    </NavLink>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <Modal open={open} onClose={onCloseModal} center>
          <h1 className="text-black">Terms & Conditions</h1>
          <br />
          <p className="text-black">
            Welcome to Audify Music Player!
            <br />
            By using StoryTime Podcast Player, you consent to have read,
            understood, and agree to our “Privacy Policy” and “Terms of Use”. We
            do not collect any personal information about you.
          </p>
          <p className="text-black">
            <br />
            1. Application shall mean “Audify Music Player”
            <br />
            2. We, Our, Us, and Developer shall mean Audify Music Player <br />
            3. User shall mean the person using the Application <br />
            4. Storage shall mean your SD card/External Storage and internal
            storage of your device Our application needs permission to have
            access to your
          </p>
        </Modal>
      </div>
    </>
  );
};

export default RegisterPage;
