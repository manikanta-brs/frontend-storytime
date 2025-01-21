import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000", // Make sure the base URL is correct
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "storytime",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/api/users/register",
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = apiSlice;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:5000",
//   prepareHeaders: (headers, { getState }) => {
//     const state = getState();
//     console.log(state); // For debugging
//     const token = state.auth?.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// // Base query handler to deal with 401 Unauthorized error (token expiration)
// const baseQueryWithHandler = async (args, api, extraOptions) => {
//   // Call the baseQuery
//   const result = await baseQuery(args, api, extraOptions);

//   // Handle unauthorized responses
//   // if (result.error && result.error.status === 401) {
//   //   console.error("Unauthorized: Invalid or expired token.");
//   //   // Optionally, clear the token from the Redux state if needed
//   //   api.dispatch({ type: "auth/logout" }); // Dispatch a logout action (customize based on your state)
//   //   return {
//   //     error: {
//   //       status: 401,
//   //       message: "Unable to load data due to invalid or expired token.",
//   //     },
//   //   };
//   // }
//   if (result.error && result.error.status === 401) {
//     console.error("Unauthorized: Invalid or expired token.");
//     api.dispatch(logout());
//     // Optionally redirect to login screen
//     window.location.href = "/login";
//     return {
//       error: {
//         status: 401,
//         message: "Unable to load data due to invalid or expired token.",
//       },
//     };
//   }

//   return result;
// };

// export const apiSlice = createApi({
//   reducerPath: "storytime",
//   baseQuery: baseQueryWithHandler, // Use baseQueryWithHandler for error handling
//   tagTypes: ["User"],
//   endpoints: (builder) => ({
//     register: builder.mutation({
//       url: "/api/users/register",
//       method: "POST",
//       query: (data) => ({
//         body: data,
//       }),
//     }),
//     // Example: You can add other endpoints as needed.
//     updateProfile: builder.mutation({
//       query: (data) => ({
//         url: "/api/users/profile", // Endpoint
//         method: "PUT", // HTTP method
//         body: data, // Data to send
//       }),
//       invalidatesTags: ["User"], // Invalidate cache for User
//     }),
//     // Any other API calls you might need
//   }),
// });

// export default apiSlice;
