import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = { email: "" };

// Renamed to validationSchema for clarity
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordPage = () => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    // Simulate network request delay (replace with actual async logic)
    setTimeout(() => {
      console.log(values);
      resetForm();
      setSubmitting(false);
    }, 5000);
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
              validationSchema={validationSchema} // Changed to validationSchema
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h3 className="Auth-form-title py-4 text-center">
                    Forgot Password
                  </h3>
                  <hr />
                  <div className="form-group mt-3 px-5 py-2 mx-5">
                    <label>Email Address</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {/* Updated error message styling */}
                    <ErrorMessage
                      className="text-red-500"
                      name="email"
                      component="div"
                    />
                  </div>

                  <div className="d-grid gap-2 mt-3 px-5 mb-4 mx-5">
                    <button
                      type="submit"
                      disabled={isSubmitting} // Using isSubmitting instead of isLoading
                      className={`block w-full py-2 px-4 rounded-xl btnPurpleColor ${
                        isSubmitting
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-700 text-white font-bold"
                      }`}
                    >
                      Submit
                    </button>
                  </div>

                  <div className="text-center text-sm text-black py-6 bg-gray-300 rounded-b-xl bg-opacity-20">
                    You don't have an account?
                    <Link
                      className="font-medium text-purple-600 hover:text-purple-500 text-center py-2 ml-3 linkColor" // Removed greyColor
                      to="/register"
                    >
                      Sign Up
                    </Link>
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

export default ForgotPasswordPage;
